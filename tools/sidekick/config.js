/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// This file contains the pages-specific configuration for the sidekick.
window.hlx.initSidekick({
  project: 'Adobe Landing Pages',
  host: 'pages.adobe.com',
  hlx3: true,
  plugins: [
    // PARENT FOLDER -----------------------------------------------------------------
    {
      id: 'folder',
      condition: (sidekick) => !sidekick.isEditor(),
      button: {
        text: 'Parent Folder',
        action: async (evt, sk) => {
          let folderURL;
          const path = sk.location.pathname;
          const { config: cfg } = sk;
          try {
            const resp = await fetch(`https://admin.hlx3.page/preview/${cfg.owner}/${cfg.repo}/${cfg.ref}${path}`);
            if (resp.ok) {
              const json = await resp.json();
              folderURL = json
                && json.edit
                && Array.isArray(json.edit.folders)
                && json.edit.folders[0]
                && json.edit.folders[0].url;
            } else {
              console.log('Failed to retrieve data', resp.status, await resp.text());
            }
          } catch (e) {
            console.log('Failed to connect to API host', e);
          }
          if (folderURL) {
            if (evt.metaKey || evt.shiftKey || evt.which === 2) {
              window.open(folderURL);
            } else {
              window.location.href = folderURL;
            }
          } else if (window.confirm('Sorry, but finding the parent folder of this page\'s source document has failed. Do you want to go to the root folder instead?')) {
            window.open('https://drive.google.com/drive/u/0/folders/1DS-ZKyRuwZkMPIDeuKxNMQnKDrcw1_aw');
          }
        },
      },
    },
  ],
});

(() => {
  const purgeProd = async ({ detail = {}}) => {
    // purge url from production cdn cache
    let { data: path } = detail;
    if (!path) {
      return;
    }
    if (!path.startsWith('/')) {
      // get absolute path
      path = new URL(path, location.href).pathname;
    }
    const { config } = window.hlx.sidekick;
    const purgeUrl = `https://${config.host}${path}`;
    console.log(`purging ${purgeUrl}`);
    try {
      const resp = await fetch(purgeUrl, { method: 'PURGE' });
      if (!resp.ok) {
        throw new Error(`non-ok status ${resp.status}`);
      }
      // refresh browser cache
      await fetch(purgeUrl, { cache: 'reload' });
    } catch (e) {
      console.error(`failed to purge ${purgeUrl}: ${e.message}`);
    }
  };
  window.hlx.sidekick.addEventListener('published', purgeProd);
  window.hlx.sidekick.addEventListener('unpublished', purgeProd);
})();

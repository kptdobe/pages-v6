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

import { isNodeName } from '../../../templates/default/default.js';

function imageTypeChecker($block) {
  const rows = $block.querySelectorAll(':scope > div');
  rows.forEach(($row) => {
    const imageColumn = $row.querySelector('div:first-of-type');
    if (!isNodeName(imageColumn.firstElementChild, 'PICTURE')) {
      const iconType = imageColumn.innerText;
      imageColumn.innerHTML = `
        <img src="/icons/${iconType}.svg">
      `;
    }
  });
}

/** @type {import('../block.js').BlockDecorator} */
export default async function decorate($block) {
  imageTypeChecker($block);
}
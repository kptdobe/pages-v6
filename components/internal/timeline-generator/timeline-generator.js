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

/* eslint-disable */

import { loadCSS, loadJSModule } from '../../scripts/scripts.js';

/** @type {import("../block").BlockDecorator} */
export default async function decorate(blockEl) {
  await Promise.all([
    loadJSModule('/scripts/fullcalendar.main.min.js').then(
      () => loadJSModule('/scripts/fullcalendar.locales-all.min.js'),
    ),
    loadJSModule('https://code.jquery.com/jquery-3.5.1.min.js'),
  ]);
  loadCSS('/styles/internal/fullcalendar.main.min.css');
  // loadCSS('/styles/internal/default.css');

  blockEl.innerHTML = `
<div id="request-form">
 <form>
  <div id="form-section-1">
   <h2>Select your start date</h2>
    <div>
     <input id="start-date" type="date" value="" />
    </div>
    <h2>Select your test deliverables</h2>
     <ul>
      <li id="ccd-banner">
        <div>
          <input type="number" id="ccd-ccw-banner-qty" name="ccd-ccw-banner-qty" value="0" data-deliverable="CCD/CCW Banner" />
        </div>
        <label for="ccd-ccw-banner-qty">CCD/CCW Banner</label>
      </li>
      <li id="email">
        <div>
          <input type="number" id="email-qty" name="email-qty" value="0" data-deliverable="Email" />
        </div>
        <label for="email-qty">Email</label>
      </li>
      <li id="web-landing-page">
        <div>
          <input type="number" id="web-landing-page-qty" name="web-landing-page-qty" value="0" data-deliverable="Web Landing Page" />
        </div>
        <label for="web-landing-page-qty">Web Landing Page</label>
      </li>
      <li id="in-app-home-banner">
        <div>
          <input type="number" id="first-mile-banner-qty" name="first-mile-banner-qty" value="0" data-deliverable="In-App Home Banner" />
        </div>
        <label for="first-mile-banner-qty">In-App Home Banner</label>
      </li>
      <li id="in-app-launchpad">
        <div>
          <input type="number" id="in-app-launchpad-qty" name="in-app-launchpad-qty" value="0" data-deliverable="In-App Launchpad" />
        </div>
        <label for="in-app-message-qty">In-App Launchpad</label>
      </li>
      <li id="in-app-pancake">
        <div>
          <input type="number" id="in-app-pancake-qty" name="in-app-pancake-qty" value="0" data-deliverable="In-App Pancake" />
        </div>
        <label for="in-app-message-qty">In-App Pancake</label>
      </li>
      <li id="dtn">
        <div>
          <input type="number" id="desktop-notification-qty" name="desktop-notification-qty" value="0" data-deliverable="Desktop Notification" />
        </div>
        <label for="desktop-notification-qty">Desktop Notification</label>
        </li>
        <li id="paid-social">
          <div>
            <input type="number" id="paid-social-ad-qty" name="paid-social-ad-qty" value="0" data-deliverable="Paid Social Ad" />
          </div>
          <label for="paid-social-ad-qty">Paid Social Ad</label>
        </li>
        <li id="other">
          <div>
            <input type="number" id="other-qty" name="other-qty" value="0" data-deliverable="Other" />
          </div>
          <label for="other-qty">Other</label>
        </li>
      </ul>
      <p><input type="button" value="Continue" /></p>
    </div>
    <div id="form-section-2">
      <h2>Dependent teams</h2>
      <p>Please list any other teams dependent on Growth Design for their work on the project.</p>
      <textarea id="dependencies" name="dependencies" placeholder="Example: LCM's dependency on us to deliver an email XD file for them to code and QA the email."></textarea>
      <div id="dependency-extra">
        <h2>Dependency deadlines</h2>
        <p>Since another team is dependent on Growth Design handing off assets, please share what day(s) the handoff needs to happen in order to keep the project timeline on track.</p>
        <textarea id="dependency-deadlines" name="dependency-deadlines"></textarea>
      </div>
      <h2>Stakeholders</h2>
      <p>Share who needs to review and sign off on design assets. We typically have at least a first review and a final review in the creative process; if different people need to be involved in each review, please specify.</p>
      <textarea id="stakeholders" name="stakeholders"></textarea>
      <h2>Test charter link</h2>
      <p>If you don't have a test charter yet, you could also link a creative brief or Jira ticket. You must get test charter approval before we execute on high fidelity designs.</p>
      <input type="text" id="" name="" />
      <p><input type="submit" value="Submit request" /></p>
    </div>
  </form>
</div>
<div id="timeline">
  <div id="calendar"></div>
</div>
<div id="modal">
  <div id="modal-content">
   <h2>Welcome to the Growth Design Project Manager</h2>
     <label for="username">What's your name?</label>
     <p>We'll try to remember this so you don't have to re-type it every time you submit a project request.</p>
     <input type="text" id="name" name="name" placeholder="First and last name, please!" />
     <p><input type="submit" id="submit-name" value="Get started" /></p>
  </div>
</div>`;

  // to do:
  // take date and map deliverables onto calendar
  // collapse date and deliverables on form
  // insert PMs and test charter fields on form
  // query existing events to see what designers are
  // occupied on this date range with events or exceptions
  // show list of available designers on the date range

  // { type of deliverable: number of days to first review, number of days to second review
  const deliverableRules = [
    { name: 'CCD/CCW Banner', review1: 2, review2: 2 },
    { name: 'Email', review1: 2, review2: 2 },
    { name: 'Web Landing Page', review1: 2, review2: 2 },
    { name: 'In-App Home Banner', review1: 2, review2: 2 },
    { name: 'In-App Launchpad', review1: 2, review2: 3 },
    { name: 'In-App Pancake', review1: 1, review2: 1 },
    { name: 'Desktop Notification', review1: 1, review2: 1 },
    { name: 'Paid Social Ad', review1: 2, review2: 2 },
    { name: 'Other', review1: 3, review2: 3 },
  ];
  const designers = [
    'Brijhette',
    'Cass',
    'Christine',
    'Kenny',
    'Nana',
    'Unassigned',
    'Multiple Designers',
  ];

  const tentativeColor = '#ec5aaa';

  async function fetchBacklog() {
    const resp = await fetch('growth-design-backlog.json');
    const json = await resp.json();
    return (Array.isArray(json) ? json : json.data);
  }

  function objKeysToString(o, k, sep) {
    return k.map((key) => o[key]).filter((v) => v).join(sep);
  }

  function calcBusinessDays(dDate1, dDate2) { // input given as Date objects
    let iWeeks;
    let iDateDiff;
    let iAdjust = 0;
    if (dDate2 < dDate1) return -1; // error code if dates transposed
    let iWeekday1 = dDate1.getDay(); // day of week
    let iWeekday2 = dDate2.getDay();
    iWeekday1 = (iWeekday1 === 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
    iWeekday2 = (iWeekday2 === 0) ? 7 : iWeekday2;
    if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
    iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
    iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

    // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
    iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000);

    if (iWeekday1 < iWeekday2) { // Equal to makes it reduce 5 days
      iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1);
    } else {
      iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2);
    }

    iDateDiff -= iAdjust; // take into account both days on weekend

    return iDateDiff;
  }

  function setCookie(name, value) {
    document.cookie = `${name}=${value || ''}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  }

  function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  async function buildEvent() {
    // count the numbers of each deliverable
    const deliverables = [];
    const startDate = new Date(`${$('#start-date').val()} ` + '00:00');

    // for each deliverable on the form, create an object storing the type + length of time
    $('form ul li input').each(function () {
      let totalLength = 0;
      const count = parseInt($(this).val(), 10);
      // if this is a chosen deliverable aka # is not 0
      if (count > 0) {
        // get text label for deliverable
        const deliverableType = $(this).attr('data-deliverable');

        // find item in deliverableRules list with same text
        const result = deliverableRules.find((x) => x.name === deliverableType);
        console.log(`review 1 is ${result.review1} and review 2 is ${result.review2}`);
        if (count > 1) {
          totalLength = totalLength
          + (count * parseInt(result.review1, 10)) + (count * parseInt(result.review2, 10));
          console.log(`deliverable totallength is ${totalLength}`);
        } else {
          totalLength += (parseInt(result.review1, 10) + parseInt(result.review2, 10));
        }

        deliverables.push({
          name: deliverableType,
          review1: result.review1,
          review2: result.review2,
          totalLength,
        });
      }
    });

    // combine deliverable names to make event name
    let eventName;
    if (deliverables.length > 1) {
      eventName = `Unassigned: ${deliverables.map((e) => e.name).join(' | ')}`;
    } else {
      eventName = `Unassigned: ${deliverables[0].name}`;
    }
    // put together total event length
    let eventTime = deliverables.reduce((tot, deliverable) => tot + deliverable.totalLength, 0);

    const endDate1 = new Date(`${$('#start-date').val()} ` + '00:00');
    endDate1.setDate(startDate.getDate() + eventTime);
    console.log(`start date is ${startDate} and end date is ${endDate1}`);

    const workDayCount = calcBusinessDays(startDate, endDate1);
    console.log(`workday count is ${workDayCount}`);

    let endDate;
    if (workDayCount < eventTime) {
      const diff = parseInt(eventTime, 10) - parseInt(workDayCount, 10);
      eventTime = diff + eventTime;
      console.log(`event time with diff is ${eventTime}`);
      endDate = new Date(`${$('#start-date').val()} ` + '00:00');
      endDate.setDate(startDate.getDate() + eventTime);
    }

    events.push({
      title: eventName,
      start: startDate,
      end: endDate,
      testCharter: 'NA',
      designers: 'Unassigned',
      PMs: 'NA',
      backgroundColor: tentativeColor,
      borderColor: tentativeColor,
      allDay: true,
    });

    makeCalendar();
  }

  async function makeCalendar() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new window.FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek',
      },
      hiddenDays: [0, 6],
      displayEventTime: false,
      initialDate: new Date().toDateInputValue(),
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: false, // allow "more" link when too many events
      events,
      eventTextColor: '#111',
      eventDidMount(info) {
        // console.log(info.event.extendedProps);
        // add pop-up showing PM, Designer, test charter link
      },
    });
    calendar.render();
  }

  const events = [];

  async function insertBacklog() {
    const backlog = await fetchBacklog();
    // console.log("backlog is " + JSON.stringify(backlog))
    function createDateFromSerial(serialNum) {
      return serialNum * 86400000 - 2209132800000;
    }
    $.each(backlog, (key, value) => {
      value.start = createDateFromSerial(value.start);
      // console.log(value.start)
      value.end = createDateFromSerial(value.end);
      if (value.designers === 'Cass') {
        value.background = '#8282f6';
      } else if (value.designers === 'Brijhette') {
        value.background = '#51d267';
      } else if (value.designers === 'Kenny') {
        value.background = '#23b2b8';
      } else if (value.designers === 'Nana') {
        value.background = '#eee';
      } else if (value.designers === 'Christine') {
        value.background = '#9bec54';
      } else if (value.designers === 'All Designers') {
        value.background = '#fad900';
      } else {
        value.background = '#fff';
      }
      if (value.start === value.end) {
        events.push({
          title: `${value.designers}: ${value.title}`,
          start: value.start,
          end: value.end,
          testCharter: value.testCharter,
          designers: value.designers,
          PMs: value.PMs,
          backgroundColor: value.background,
          borderColor: value.background,
          allDay: true,
        });
      } else {
        events.push({
          title: `${value.designers}: ${value.title}`,
          start: value.start,
          end: value.end,
          testCharter: value.testCharter,
          designers: value.designers,
          PMs: value.PMs,
          backgroundColor: value.background,
          borderColor: value.background,
        });
      }
    });

    makeCalendar();
  }

  insertBacklog();

  // } else {
  //   const backlog = fetchBacklog();
  // }

  Date.prototype.toDateInputValue = (function () {
    const local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  });

  async function updateCalendar() {
    const existing = events.find((x) => x.backgroundColor === tentativeColor);

    // if this is not the first addition to the calendar, remove old event before remaking
    if (existing) {
      // remove old event
      events.splice(events.findIndex((v) => v.backgroundColor === tentativeColor), 1);
    }

    // create total event length based on review 1 + review 2 numbers + startdate
    buildEvent();
  }

  function showModal() {
    $('#modal').fadeIn();
  }

  function hideModal() {
    $('#modal').fadeOut();
  }

  // DOM scriptins
  $(document).ready(() => {
    const username = getCookie('username');
    if (username == null) {
      showModal();
    }
    $("input[type='date']").val(new Date().toDateInputValue());
    $('form ul').on('click', 'li', function () {
      const item = $(this).find('div input').attr('id');
      if ($(this).find('div').css('opacity') === '1') {
        $(this).find('div input').focus();
      } else {
        $(this).find('div').css('opacity', '1');
        $(this).find('div input').val('1').change()
          .focus();
      }
    });
    $('form ul li div').on('change', 'input', function () {
      const originalText = $(this).parents('li').children('label').text();
      if ($(this).val() > 1 && !$(this).parents('li').hasClass('plural')) {
        $(this).parents('li').addClass('plural').children('label')
          .text(`${originalText}s`);
      } else if ($(this).val() < 2 && $(this).parents('li').hasClass('plural')) {
        const newText = originalText.substring(0, originalText.length - 1);
        $(this).parents('li').removeClass('plural').children('label')
          .text(newText);
      }
    });
    $('form ul li div').on('blur', 'input', function () {
      if ($(this).val() === 0) {
        $(this).css('opacity', '0');
      }
    });

    $('#submit-name').on('click', () => {
      const value = $('#name').val();
      setCookie('username', value);
      hideModal();
    });

    $('form #form-section-1').on('change', () => {
      updateCalendar();
    });

    $('#form-section-1').on('click', 'input[type=button]', () => {
      $('#form-section-1').fadeOut();
      $('#form-section-2').fadeIn();
    });
  });
}

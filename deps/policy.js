/*
 * Copyright 2018 Google LLC. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

/**
 * @fileoverview Feature Policy config for Chrome Dev Summit.
 */

'use strict';

// snapshot from Chrome 71.0.3554.0
const policies = [
  'geolocation',
// for YT
  // 'accelerometer',
  'midi',
  'payment',
// otherwise we.. can't scroll the page
  // 'vertical-scroll',
  'camera',
  'usb',
  'magnetometer',
// for YT
  // 'fullscreen',
  'legacy-image-formats',
// for YT
  // 'picture-in-picture',
  'animations',
  'vr',
// for YT
  // 'encrypted-media',
// for YT
  // 'autoplay',
  'speaker',
  // 'unsized-media',
  'ambient-light-sensor',
// we downsize images 3-4 times in some places, but use them again elsewhere
  // 'max-downscaling-image',
// for YT
  // 'gyroscope',
  'document-write',
  'lazyload',
// needed even for <script defer> with inline JS
  // 'sync-script',
  'sync-xhr',
  'image-compression',
  'microphone',
];

const requiredInDev = [
  // both needed run to run Less.js in the browser
  'sync-script',
  'sync-xhr',
];

module.exports = (isProd) => {
  let out;

  if (isProd) {
    out = policies;
  } else {
    out = policies.slice();

    for (const devPolicy of requiredInDev) {
      const index = out.indexOf(devPolicy);
      if (index !== -1) {
        out.splice(index, 1);
      }
    }
  }

  return out.map((policy) => `${policy} 'none'`).join(', ');
};
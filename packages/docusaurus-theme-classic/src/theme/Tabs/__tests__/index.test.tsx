/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from '../index';
import TabItem from '../../TabItem';

describe('Tabs', () => {
  test('Should reject bad Tabs child', () => {
    expect(() => {
      renderer.create(
        <Tabs>
          <div>Naughty</div>
          <TabItem value="good">Good</TabItem>
        </Tabs>,
      );
    }).toThrowErrorMatchingInlineSnapshot(
      `"Docusaurus error: Bad <Tabs> child <div>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique \\"value\\" prop."`,
    );
  });
  test('Should reject bad Tabs defaultValue', () => {
    expect(() => {
      renderer.create(
        <Tabs defaultValue="bad">
          <TabItem value="v1">Tab 1</TabItem>
          <TabItem value="v2">Tab 2</TabItem>
        </Tabs>,
      );
    }).toThrowErrorMatchingInlineSnapshot(
      `"Docusaurus error: The <Tabs> has a defaultValue \\"bad\\" but none of its children has the corresponding value. Available values are: v1, v2. If you intend to show no default tab, use defaultValue={null} instead."`,
    );
  });
  test('Should reject duplicate values', () => {
    expect(() => {
      renderer.create(
        <Tabs>
          <TabItem value="v1">Tab 1</TabItem>
          <TabItem value="v2">Tab 2</TabItem>
          <TabItem value="v3">Tab 3</TabItem>
          <TabItem value="v4">Tab 4</TabItem>
          <TabItem value="v1">Tab 5</TabItem>
          <TabItem value="v2">Tab 6</TabItem>
        </Tabs>,
      );
    }).toThrowErrorMatchingInlineSnapshot(
      `"Docusaurus error: Duplicate values \\"v1, v2\\" found in <Tabs>. Every value needs to be unique."`,
    );
  });
  test('Should accept valid Tabs config', () => {
    expect(() => {
      renderer.create(
        <>
          <Tabs>
            <TabItem value="v1">Tab 1</TabItem>
            <TabItem value="v2">Tab 2</TabItem>
          </Tabs>
          <Tabs>
            <TabItem value="v1">Tab 1</TabItem>
            <TabItem value="v2" default>
              Tab 2
            </TabItem>
          </Tabs>
          <Tabs defaultValue="v1">
            <TabItem value="v1" label="V1">
              Tab 1
            </TabItem>
            <TabItem value="v2" label="V2">
              Tab 2
            </TabItem>
          </Tabs>
          <Tabs
            defaultValue="v1"
            values={[
              {value: 'v1', label: 'V1'},
              {value: 'v2', label: 'V2'},
            ]}>
            <TabItem>Tab 1</TabItem>
            <TabItem>Tab 2</TabItem>
          </Tabs>
          <Tabs
            defaultValue={null}
            values={[
              {value: 'v1', label: 'V1'},
              {value: 'v2', label: 'V2'},
            ]}>
            <TabItem>Tab 1</TabItem>
            <TabItem>Tab 2</TabItem>
          </Tabs>
          <Tabs defaultValue={null}>
            <TabItem value="v1" label="V1">
              Tab 1
            </TabItem>
            <TabItem value="v2" label="V2">
              Tab 2
            </TabItem>
          </Tabs>
        </>,
      );
    }).toMatchInlineSnapshot(`[Function]`); // This is just a check that the function returns. We don't care about the actual DOM.
  });
});

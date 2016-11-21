import React from 'react';
import { mount, render } from 'enzyme';
import HomePage from './';

it('renders without crashing', () => {
    render(<HomePage />);
});

it('renders an application logo', () => {
    const fakeSrc = 'test-src.png';
    const homePage = render(<HomePage logoSrc={ fakeSrc } />);
    const imgResults = homePage.find('img');

    expect(imgResults.length).toBe(1);

    const imgAttribs = imgResults[0].attribs;

    expect(imgAttribs.src).toBe(fakeSrc);
    expect(imgAttribs.alt).toBe('application-logo');
});

import { configure } from '@storybook/react';

const requireContext = require.context('../src', true, /\.story.jsx?$/);

function loadStories () {
  requireContext.keys().forEach(story => requireContext(story));
}

configure(loadStories, module);

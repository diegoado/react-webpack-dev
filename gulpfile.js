'use strict';

const gulp = require('gulp');
const { spawn } = require('child_process');

const agent = /^win/i.test(process.platform) ? 'npm.cmd' : 'npm';

gulp.task('lint', callback => {
  const cmd = spawn(agent, ['run', 'lint', '-s'], { stdio: 'inherit' });
  cmd.on('close', () => callback());
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', gulp.series('lint'));
});

gulp.task('default', gulp.series(['lint', 'watch']));

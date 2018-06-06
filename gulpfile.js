'use strict';

const gulp = require('gulp');
const { spawn } = require('child_process');

gulp.task('lint', (callback) => {
  const cmd = spawn('npm', ['run', 'lint', '-s'], { stdio: 'inherit' });
  cmd.on('close', () => callback());
});

gulp.task('default', ['lint'], () => {
  gulp.watch('src/**/*.js', ['lint']);
});

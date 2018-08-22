import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  entry: './src/index.js',
  format: 'umd',
  dest: './dist/index.js',
  plugins: [
    babel(),
    livereload(),
    serve({ contentBase: ['dist', 'src', 'example'], open: true })
  ],
  watch: {
    include: './src/**'
  }
}

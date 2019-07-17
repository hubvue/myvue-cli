# optimization 
## minimize
告诉webpack使用`TerserPlugin`压缩bundle

production环境下默认是true，开发环境默认为false。
```js
module.exports = {
    optimization: {
        minimize: true,
    }
}
```
## minimizer
允许通过提供一个或多个定制化的TerserPlugin实例，来覆盖默认的压缩工具。

安装TerserPlugin
> npm install terser-webpack-pluign

```js
module.exports = {
    optimization: {
        minimizer: [
            new TerserPluign({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {}
            })
        ]
    }
}
```
或者也可以使用另外一种写法：
```js
module.exports = {
    optimization: {
        minimizer: [
            (compiler) => {
                const TerserPlugin = require("terser-webpack-plugin");
                new TerserPlugin({
                    cache: true,
                    paraller: true,
                    sourceMap: true,
                    terserOptions: {},
                }).apply(compiler); 
            }
        ]
    }
}
```

## splitChunks
代码拆分策略。

## runtimeChunk
webpack在输出文件中内部实现了模块化的机制和一些工具方法，可以称为webpack运行时的函数。使用runtimeChunk就可以把Chunk的工具方法抽离出来，共用，达到减小chunk体积的效果。
```js
module.exports = {
    optimization: {
        runtimeChunk: {
            // name: "runtime",
            name: entrypoint => `runtime-${entrypoint.name}`,
        }
    }
}
```
## noEmitOnErrors
在编译错误时，使用`noEmitOnErrors`来跳过生成阶段。这样可以确保没有生成错误资源。 

```js
optimization: {
    noEmitOnErrors: true,
}
```

## namedModules 和  namedChunks
告知webpack使用可读取的chunk or module 标识符，来帮助更好的调试。
默认情况下开发环境下启用，生产环境下禁用。

```js
module.exports = {
    optimization: {
        namedModules: true,
        namedChunks: true,
    }
}
```
## moduleIds
告诉webpack在选择module id的时候使用哪种算法。是一个boolean值或者是string。
1. false: 不适用任何内置渲染，可以通过插件提供自定义算法。
2.  "natural"：数字ID按使用顺序排序。
3. "named"：使用name值作为ID，可读性高。
4. "hashed"：使用短hash作为moduleID值。
5. "size"：数字ID，依据最小的初始下载大小。
6. "total-size": 也是数字ID，依据与最小的总下载大小。

## chunkIds
告诉webpack在选择chunkId的时候使用哪种算法。和moduleIds类似
1. false：不适用任何算法，通过插件提供自定义算法。
2. natural：自然数ID
3. named：使用name值作为Id，可读性高。
4. size：数字ID，依据最小的初始下载大小。
5. total-size：数字ID，依据最小的总下载大小。

## splitChunks
webpack4中用于分割代码的利器。
### automaticNameDelomiter
用于指定生成文件名称之间的分隔符。例如`vendors~main.js`.
默认情况下使用块的原名称和块name来生成。
```js
module.exports = {
    optimization: {
        splitChunks: {
            automaticNameDelomiter: "~"
        }
    }
}
```
### chunks
作用是将选择哪些块进行优化。值为一个字符串：
1. all  所有的
2. async    异步的
3. initial  初始的

```js
module.exports = {
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
}
```
值还可以是一个数组，返回值用于指定包括哪些块。
```js
module.exports = {
    optimization: {
        splitChunks: {
            //exclude main chunk
            chunks: chunk => chunk.name !=== 'main',
        }
    }
}
```
## maxAsyncRequests
值为number，表示为按需加载时的最大并行请求数。

## maxInitialRequests
值为number，表示入口点处的醉啊并行请求数。

## minChunks
值为number，分割前必须共享模块的最小块数。

## minSize
值为number，要生成块的最小大小(以字节为单位)。  

## maxSize
使用maxSize 告诉webpack尝试将块分割maxSize成更大的部分。

> maxSize 和 minSize都是用来控制包的大小的。

控制包的优先级是：
minsize > maxSize > maxAsyncRequests/maxInitialRequest

## name
用于拆分块以什么命名，
值为true将根据块和缓存组密钥自动生成名称。
生产环境下建议设置为false，避免不必要的更改名称。
```js
module.exports = {
    optimization: {
        splitChunks: {
            name: true,
        }
    }
}
```
## cacheGroups
设置缓存组，缓存组可以继承或覆盖任何在splitChunks上的属性，但是test，priority和reuseExistingChunk只能再缓存组中配置。

如果要禁用一个缓存组，把其default属性设置成false即可。

### test
值为string，RegExp，function(module,chunk)
作用是控制缓存组选择的模块，它可以匹配绝对路径资源路径或块的名称，匹配到块的名称时，将渲染所在块中的所有模块。

如果把这个字段省略会选择所有模块。

```js
module.exports = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    }
}
```
### filename
值为string，允许在当且仅当它是初始块时覆盖文件名。所有可以用的占位符`output.filename`也可以在此处获得。
```js
module.exports = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    filename: "[name].bundle.js"
                }
            }
        }
    }
}

```

### enforce
如果在缓存组中想要忽略splitChunks的minSize、minChunks、maxAsyncRequests和maxInitialRequest属性，可以在缓存组中姜enfore设置为true。
```js
optimization: {
    splitChunks: {
        cacheGroups: {
            vendors: {
                enforce: true,
            }
        }
    }
}
```

### priority
值为数字，缓存组优先级。
pushd rps
node_modules/jasmine/bin/jasmine.js
popd

pushd web
node_modules/karma/bin/karma start web.karma.conf.js
popd

pushd angularWeb
node_modules/karma/bin/karma start web.karma.conf.js
popd

pushd refluxWeb
node_modules/karma/bin/karma start web.karma.conf.js
popd

pushd reduxWeb
node_modules/karma/bin/karma start web.karma.conf.js
popd

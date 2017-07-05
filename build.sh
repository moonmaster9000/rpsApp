pushd rps && node_modules/jasmine/bin/jasmine.js && popd

FRONTENDS="web angularWeb refluxWeb reduxWeb vueWeb"

for frontend in $FRONTENDS; do
    pushd $frontend
    node_modules/karma/bin/karma start web.karma.conf.js
    popd
done

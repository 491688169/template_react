import engine from "store/src/store-engine";
import localStorage from "store/storages/localStorage";
import memoryStorage from "store/storages/memoryStorage";
import observerPlugin from "store/plugins/observe";

const storages = [localStorage, memoryStorage];

const plugins = [observerPlugin];

const namespace = __PRODUCT__;
const store = engine.createStore(storages, plugins, namespace);

window.addEventListener("storage", function (e) {
    if (!e.key?.startsWith(store._namespacePrefix)) {
        console.warn(
            `Not use custom storage. key: ${e.key}, oldValue: ${e.oldValue}, newValue: ${e.newValue}`
        );
    }
});

export default store;

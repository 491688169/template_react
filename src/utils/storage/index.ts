import engine from "store/src/store-engine";
import localStorage from "store/storages/localStorage";
import memoryStorage from "store/storages/memoryStorage";
import observerPlugin from "store/plugins/observe";

const storages = [localStorage, memoryStorage];

const plugins = [observerPlugin];

engine.createStore(storages, plugins, __PRODUCT__);

export default engine;

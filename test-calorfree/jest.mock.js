let syncStorage = {}
const ramda = require("ramda");

global.chrome = {
    storage: {
        sync: {
            clear: () => {
                syncStorage = {}
            },
            set: (toSet) => {
                syncStorage = {...syncStorage, ...toSet}
            },
            get: (toGet) => {
                return ramda.pick(toGet, syncStorage);
            }
        }
    }
}

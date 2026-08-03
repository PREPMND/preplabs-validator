export class Search {
    #flags = "i";
    ignoreCase() {
        if (!this.#flags.includes("i")) {
            this.#flags += "i";
        }
        return this;
    }
    caseSensitive() {
        this.#flags = this.#flags.replace("i", "");
        return this;
    }
    contains(value) {
        return new RegExp(value, this.#flags);
    }
    startsWith(value) {
        return new RegExp("^" + value, this.#flags);
    }
    endsWith(value) {
        return new RegExp(value + "$", this.#flags);
    }
    exact(value) {
        return new RegExp("^" + value + "$", this.#flags);
    }
}
export function search() {
    return new Search();
}

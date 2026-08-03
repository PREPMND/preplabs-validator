export class Search {
    #flags = "i";
    ignoreCase(): this {
        if (!this.#flags.includes("i")) {
            this.#flags += "i";
        }
        return this;
    }
    caseSensitive(): this {
        this.#flags = this.#flags.replace("i", "");
        return this;
    }
    contains(value: string): RegExp {
        return new RegExp(value, this.#flags);
    }
    startsWith(value: string): RegExp {
        return new RegExp("^" + value, this.#flags);
    }
    endsWith(value: string): RegExp {
        return new RegExp(value + "$", this.#flags);
    }
    exact(value: string): RegExp {
        return new RegExp("^" + value + "$", this.#flags);
    }
}
export function search() {
    return new Search();
}
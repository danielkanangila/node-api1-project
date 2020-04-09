export default class Database {
    constructor() {
        this.table = []
    }
    /**
     * Return list of all objects in the table property.
     */
    findall() {
        return this.table;
    }

    /**
     * Return the object with the 
     * corresponding id in the table property.
     * @param {*} id 
     */
    findone(id) {
        const result = this.table.find(t => t.id === id);
        
        if (!result.length) return false;

        return result
    }

    /**
     * Add a new object in table property 
     * and return the new created object.
     * @param {*} data 
     */
    create(data) {
        const payload = {
            id: String(this.table.length + 1),
            ...data,
        }

        this.table.push(payload);
        return payload
    }

    /**
     * Update the object with the corresponding 
     * id in the table property.
     * @param {*} id 
     * @param {*} data 
     */
    update(id, data) {
        const index = this.table.findIndex(t => t.id === id);
        if (index < 0) return false;

        this.table[index] = {
            ...this.table[index],
            ...data,
        };
        return this.table[index];
    }

    /**
     * Remove the object with the corresponding id the table property.
     * @param {*} id 
     */
    delete(id) {
        const index = this.table.findIndex(t => t.id === id);
        if (index < 0) return false
        this.table = this.table.filter(t => t.id != id)
        return id;
    }
}
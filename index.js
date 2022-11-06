class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = [] //array con objetos
        this.mascotas = []
    }

    getFullName() {
        console.log(`Usuario: ${this.nombre} ${this.apellido}`)
    }

    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota)
    }

    countMascotas() {
        console.log(`Número de mascotas: ${this.mascotas.length}`)
    }

    addBook(nombreLibro, autorLibro) {
        this.libros.push({nombreLibro, autorLibro})
    }

    getBookNames() {
        let nombreLibros = []

        console.log (`Nombre de libros:`)
        
        this.libros.forEach(element => {
            nombreLibros.push(element.nombreLibro)
        });

        console.log(nombreLibros)       
    }
}

const usuario = new Usuario('Antonela', 'Tenaglia')
usuario.getFullName()

usuario.addMascota('Donato')
usuario.addMascota('Luna')
usuario.countMascotas()

usuario.addBook('Harry Potter', 'J. K. Rowling')
usuario.addBook('El señor de los anillos','J. R. R. Tolkien')
usuario.getBookNames()
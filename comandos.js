//crea y selecciona base de datos
//use ecommerce 

//crea colecciones
db.createCollection("mensajes")
db.createCollection("productos")

//agrega 10 documentos a mensajes
db.mensajes.insertMany([{username: "Anto", message: "Hola", time: ISODate()}, {username: "Anto", message: "Como estas?", time: ISODate()},{username: "Agos", message: "Bien y vos?", time: ISODate()}, {username: "Anto", message: "Muy bien", time: ISODate()}, {username: "Agos", message: "Me alegro", time: ISODate()}, {username: "Agos", message: "Qué hiciste hoy?", time: ISODate()}, {username: "Anto", message: "Fui a la playa y vos?", time: ISODate()}, {username: "Agos", message: "Trabajé :(", time: ISODate()}, {username: "Anto", message: "Oh! la próxima será", time: ISODate()}, {username: "Agos", message: "Así es, nos vemos!", time: ISODate()}])  

//agrega 10 documentos a productos
db.productos.insertMany([{title: "Remera", price: 120, thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/shirt_sport_trickot_tshirt_clothes-256.png"}, {title: "Pantalón", price: 580, thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/shirt_sport_trickot_tshirt_clothes-256.png"}, {title: "Pulover", price: 900, thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/shirt_sport_trickot_tshirt_clothes-256.png"}, {title: "Camisa", price: 1280, thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/shirt_sport_trickot_tshirt_clothes-256.png"}, {title: "Medias", price: 1700, thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/shirt_sport_trickot_tshirt_clothes-256.png"}, {title: "Guantes", price: 2300, thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/shirt_sport_trickot_tshirt_clothes-256.png"}, {title: "Short", price: 2860, thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/shirt_sport_trickot_tshirt_clothes-256.png"}, {title: "Ojotas", price: 3350, thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/shirt_sport_trickot_tshirt_clothes-256.png"}, {title: "Zapatillas", price: 4320, thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/shirt_sport_trickot_tshirt_clothes-256.png"}, {title: "Cinturón", price: 4990, thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/shirt_sport_trickot_tshirt_clothes-256.png"}])

//lista todos los documentos 
db.mensajes.find()
db.productos.find()

//muestra cantidad de documentos
db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()

//agrega 1 documento a productos
db.productos.insertOne({title: "Botas", price: 4500, thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-outline-24-px/24/shirt_sport_trickot_tshirt_clothes-256.png"})

//realiza búsqueda por nombre de producto
db.productos.find({title: "Pantalón"})

//encuentra productos con precio menor a 1000
db.productos.find({"price": {$lt: 1000}})

//encuentra productos con precio entre 1000 y 3000
db.productos.find({$and: [ {"price": {$gt: 1000}}, {"price": {$lt: 3000}} ]})

//encuentra productos con precio mayor a 3000
db.productos.find({"price": {$gt: 3000}})

//encuentra tercer producto más barato y lo nombra
db.productos.find({},{"title":1, "_id":0}).sort({productosprice:1}).skip(2).limit(1)

//agrega nueva propiedad a todos los productos
db.productos.updateMany({}, {$set: {"stock": 100}}, {})

//cambio stock a 0 de los productos con precio mayor a 4000
db.productos.updateMany({"price": {$gt: 4000}}, {$set: {"stock": 0}}, {})

//borra productos con precio menor a 1000
db.productos.deleteMany({"price": {$lt: 1000}})

//Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce
//use admin
db.createUser(
    {
      user: "pepe", 
      pwd: "asd456", 
      roles: [
         { role: "read", db: "ecommerce" } 
      ]
    }
)

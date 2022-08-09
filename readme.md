# Nextgrowth backend (08/08/2022)


## Exercice 1:

L'objet de cet exercice est de créer un CRUD pour le modèle suivant

```
{
  "reference": "String",
  "name": "String",
  "description": "String",
  "image": "String",
  "variants": [
    {
      "sku": "String",
      "specification": "String",
      "price": "Number"
    }
  ]
}
```

Le modèle représente un product avec ces variantes. Le but est de créer un endpoint en utilisant le stack **NodeJS / ExpressJS / MongoDB.** 

Il faut avoir deux table une pour le produit et l'autre pour les variantes.

Le CRUD sera exposer comme suit 

| Methode | endpoint | &nbsp;   |
| ------- | -------- | -------- |
| GET	| /product/ |	List des produits |
| POST	| /product/	| Ajout de produit    |
| DELETE| /product/{:product_id} |	Suppression de produit |
| PATCH	| /product/{:product_id} |	Mise à jour de produit |
| GET	| /product/{:product_id}/variants/ |	List des variantes d'un produit {product_id} |
| GET	|/product/{:product_id}/variants/{:variant_id} |	List de la variante {variant_id} du produit {product_id} |
| GET	|/product/{:product_id} |	List du produit {product_id} |

Pour la creation et la mise à jour vous devez respecter le modèle pré établie. La communication avec l'api doit être uniquement en json.

Pour le volé sécurité il faut prévoir un mécanisme de clé apiKey pour sécurisé la communication. L'apiKey doit être fourni pour chaque appel sur le HTTP headers du paquet.

``` 
{
  "headers": {
    "Authorization": "apikey AHES6ZRVmB7fkLtd1"
  }
}
```

Il faut aussi prévoir la gestion des erreurs suivantes 
- Clients error responses **( 400 - 499 )**
- Server error responses **( 500 - 599 )**


La validation des data doit être sur trois niveaux
- Controleur
- Modèle
- Base de donnée


Cette validation doit être gérée par l'api.


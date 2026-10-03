/*
  Clar de Lluna — la carte.
  Tout le menu est ici. Pour changer un prix, modifiez le nombre "price"
  (point décimal : 4.5 s'affiche « 4,5 DT »). "sig: true" = signature de la maison.
  "phase" (facultatif) = dessin de lune sur la carte signature :
  new, crescent, half, gibbous, full, eclipse.
*/
const MENU = [
  { id: 'cafes', title: 'Cafés', group: 'Cafés & boissons chaudes', items: [
    { name: 'Espresso', price: 4 },
    { name: 'Macchiato', price: 4.5 },
    { name: 'Americano', price: 4.5 },
    { name: 'Latte', price: 4.9 },
    { name: 'Cappuccino', price: 5.9 },
    { name: 'Affogato', desc: 'crème glacée + espresso', price: 7 },
    { name: 'Caramel macchiato', price: 8 },
  ] },
  { id: 'the', title: 'Thé', group: 'Cafés & boissons chaudes', items: [
    { name: 'Classic', price: 4.5 },
    { name: 'Amande', price: 6.5 },
    { name: 'Pignons', price: 8 },
    { name: 'Infusions', price: 6 },
  ] },
  { id: 'chocolat', title: 'Chocolat chaud', group: 'Cafés & boissons chaudes', items: [
    { name: 'Hot chocolate', price: 7 },
    { name: 'Hot chocolate aromatisé', price: 8.5 },
    { name: 'Nutella', price: 9 },
    { name: 'Spéculoos', price: 10 },
  ] },

  { id: 'cafe-glace', title: 'Café glacé', group: 'Frais & glacé', items: [
    { name: 'Iced coffee', price: 6 },
    { name: 'Iced coffee aromatisé', desc: 'noisette, caramel, vanille', price: 8.5 },
    { name: 'Matcha', price: 8.5 },
  ] },
  { id: 'frappe', title: 'Café frappé', group: 'Frais & glacé', items: [
    { name: 'Classic', price: 10 },
    { name: 'Caramel', price: 12 },
    { name: 'Cookies', price: 12 },
    { name: 'Brownies', price: 12 },
    { name: 'Nutella', price: 14 },
  ] },
  { id: 'milkshakes', title: 'Milkshakes', group: 'Frais & glacé', items: [
    { name: 'Banane, vanille ou fraise', price: 11 },
    { name: 'Nutella', price: 12 },
    { name: 'Caramel', price: 12 },
    { name: 'Nutella banane', price: 13 },
    { name: 'Supplément', desc: 'Nutella, spéculoos, caramel', price: 3 },
  ] },
  { id: 'smoothies', title: 'Smoothies', subtitle: 'Inspirés des phases de la lune', group: 'Frais & glacé', items: [
    { name: 'Next Moon', desc: 'ananas, fruits rouges, menthe', price: 10, sig: true, phase: 'new' },
    { name: 'Half Moon', desc: 'fruits rouges, citron', price: 10, sig: true, phase: 'half' },
    { name: 'Eclipse', desc: 'mangue, orange', price: 10, sig: true, phase: 'eclipse' },
    { name: 'Moonlight', desc: 'ananas, noix de coco', price: 12, sig: true, phase: 'gibbous' },
    { name: 'Full Moon', desc: 'épinards, banane, fruit de la passion', price: 12, sig: true, phase: 'full' },
  ] },
  { id: 'mojitos', title: 'Mojitos', group: 'Frais & glacé', items: [
    { name: 'Classic', price: 7 },
    { name: 'Aromatisé', desc: 'cerise, mangue, blue moon, fruit de la passion', price: 9 },
  ] },
  { id: 'fraiches', title: 'Boissons fraîches', group: 'Frais & glacé', items: [
    { name: 'Eau minérale 0,5 L', price: 2 },
    { name: 'Eau minérale 1 L', price: 3.5 },
    { name: 'Soda', price: 5 },
    { name: 'Citronnade', price: 7 },
    { name: "Jus d'orange", price: 6 },
    { name: 'Jus de fraise', price: 8 },
  ] },

  { id: 'chimney-cakes', title: 'Chimney cakes', group: 'Sucré & salé', items: [
    { name: 'Nutella', price: 9 },
    { name: 'Snickers', desc: 'Nutella, beurre de cacahuète, caramel, cacahuètes', price: 12 },
    { name: 'Fruity', desc: 'Nutella, fraise, fruits secs', price: 12 },
    { name: 'Clar de Lluna', desc: 'caramel, banane, Nutella, fruits secs', price: 14, sig: true, phase: 'crescent' },
  ] },
  { id: 'chimney-cones', title: 'Chimney cones', group: 'Sucré & salé', items: [
    { name: 'Classic', desc: 'Nutella, crème glacée au choix', price: 9 },
    { name: 'Fruity', desc: 'Nutella, fraise, fruits secs, crème glacée au choix', price: 12 },
    { name: 'Banoffee', desc: 'caramel, banane, Nutella, fruits secs, crème glacée au choix', price: 14, sig: true, phase: 'gibbous' },
  ] },
  { id: 'crepes-sucrees', title: 'Crêpes sucrées', group: 'Sucré & salé', items: [
    { name: 'Nutella', price: 9 },
    { name: 'Spéculoos', desc: 'Nutella, spéculoos', price: 12 },
    { name: 'Nutella, fraise, banane & fruits secs', price: 14 },
    { name: 'Pistella', desc: 'Nutella, crème pistache, pistaches concassées, crème glacée au choix', price: 16, sig: true, phase: 'half' },
  ] },
  { id: 'crepes-salees', title: 'Crêpes salées', group: 'Sucré & salé', items: [
    { name: 'Fermier', desc: 'mozzarella, jambon de dinde', price: 9 },
    { name: 'Neptune', desc: 'mozzarella, thon', price: 11 },
    { name: 'Clar de Lluna', desc: 'mozzarella, cheddar, œuf, thon, jambon de dinde', price: 14, sig: true, phase: 'crescent' },
  ] },
  { id: 'creme-glacee', title: 'Crème glacée', group: 'Sucré & salé', items: [
    { name: 'Crème glacée au choix', price: 5 },
    { name: 'Nutella', price: 8 },
    { name: 'Spéculoos', price: 9 },
    { name: 'Sauce au choix', price: 7 },
  ] },
];

if (typeof module !== 'undefined') module.exports = MENU;

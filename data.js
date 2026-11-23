// Verified live 2026-11-23 in a browser unless a field says otherwise. Prices are what the listing showed that day.
// Amazon was not checked: its page bars AI agents, so nothing here comes from it.
const SH = p => `https://cdn.shopify.com/s/files/${p}`;
const RG = p => `https://assets.roguefitness.com/f_auto,q_auto,c_limit,w_1600,b_rgb:ffffff/v1/catalog/Conditioning/Strength%20Equipment/${p}`;

// The bells Drew owns: the yardsticks every handle is measured against.
const OWNED = [
 {id:'kbk20', label:'KBK powder coat 20kg', mm:38, verdict:'the gold standard', src:'KBK size guide, via search excerpt; the store is offline'},
 {id:'titan12', label:'Titan competition 12kg', mm:35, verdict:'good thickness', src:'Titan product page'},
 {id:'rep16', label:'REP 16kg', mm:33, verdict:'a little thin', src:'REP tech specs'},
];
const TARGET = {min:35, ideal:38}; // a 16kg handle under 35mm repeats the REP problem

// sec: 'hard' = hardstyle lines sold in both weights · 'comp' = 16kg competition fallback
// h16/h20 = handle diameter in mm · hsrc = who published it
// job16: 'yes' | 'thin' | 'unknown' · job20: 'yes' | 'over' | 'unknown'
const ITEMS = [
 {id:'fringe', sec:'hard', rank:1, brand:'Fringe Sport', name:'Prime Kettlebells', short:'Fringe Prime',
  url:'https://www.fringesport.com/products/prime-kettlebells-by-fringe-sport', via:'Fringe Sport',
  p16:70, p20:80, pair16:130, pair20:150, pairUrl:'https://www.fringesport.com/products/prime-kettlebell-sets',
  h16:37.8, h20:38.9, hsrc:'maker (1.49" and 1.53")', job16:'yes', job20:'yes',
  coat:'Matte black powder coat', band16:'Yellow band', band20:'Purple band', cast:'One-piece cast iron, flat machined base',
  ship:'Free to the lower 48', rating:'230 reviews on the product page',
  flags:['No owner comparison to a KBK turned up'],
  imgs:[SH('1/0049/4272/files/Savage-Kettlebells-Fringe-Sport-604306741.jpg'),SH('1/0049/4272/files/Savage-Kettlebells-Fringe-Sport-604306198.jpg'),SH('1/0049/4272/files/Prime-Kettlebell-Pairs-_-Sets-Fringe-Sport-107007451.jpg')]},
 {id:'rogue', sec:'hard', rank:2, brand:'Rogue', name:'Rogue Kettlebells', short:'Rogue',
  url:'https://www.roguefitness.com/rogue-kettlebells', via:'Rogue',
  p16:80, p20:95, h16:38.1, h20:38.1, hsrc:'maker (1.50" from 16kg to 40kg)', job16:'yes', job20:'yes',
  coat:'Textured black powder coat', band16:'Yellow stripes', band20:'Gray stripes', cast:'One-piece ductile iron, machined flat base',
  ship:'Extra, not quoted here', rating:'4.8★ (1,476)',
  flags:['The 20kg stripe is gray, and gray also marks the 6kg and 36kg','Some owners call the coat gritty enough to sand','Shipping is extra'],
  imgs:[RG('Kettlebells/IP0670/IP0670-H_j6gkfw.png')]},
 {id:'rogue-ecoat', sec:'hard', rank:3, brand:'Rogue', name:'Rogue Kettlebell, E-Coat', short:'Rogue E-Coat',
  url:'https://www.roguefitness.com/rogue-kettlebell-e-coat', via:'Rogue',
  p16:85, p20:95, h16:38.1, h20:38.1, hsrc:'maker (1.5" from 35 lb to 88 lb)', job16:'yes', job20:'yes',
  coat:'Semi-gloss e-coat', band16:'No color', band20:'No color', cast:'Ductile iron, cast in Michigan',
  ship:'Extra, not quoted here', rating:'Not checked',
  flags:['All black: weight is stamped in, with no color anywhere','Sold in pounds (35 and 44), built to the kg weight','Shipping is extra'],
  imgs:[RG('USC001/USC001-H_gsfrjc.png')]},
 {id:'rogue-pc', sec:'hard', rank:4, brand:'Rogue', name:'Rogue Kettlebell, Powder Coat', short:'Rogue USA Powder Coat',
  url:'https://www.roguefitness.com/rogue-kettlebell-powder-coat', via:'Rogue',
  p16:85, p20:95, h16:38.1, h20:38.1, hsrc:'maker (1.5" from 35 lb to 88 lb)', job16:'yes', job20:'yes',
  coat:'Textured black powder coat', band16:'No color', band20:'No color', cast:'Gray iron, cast in Ohio',
  ship:'Extra, not quoted here', rating:'Not checked',
  flags:['All black: weight is stamped in, with no color anywhere','Sold in pounds (35 and 44), built to the kg weight','Shipping is extra'],
  imgs:[RG('Kettlebells/USC001-PC/USC001-PC-H_jnu0qk.png')]},
 {id:'ab', sec:'hard', rank:5, brand:'American Barbell', name:'Classic Kettlebell', short:'American Barbell Classic',
  url:'https://americanbarbell.com/products/american-barbell-cast-kettlebell', via:'American Barbell',
  p16:102, p20:128, h16:34, h20:38, hsrc:'a reseller listing, not American Barbell’s own page', job16:'thin', job20:'yes',
  coat:'Textured finish, cast iron', band16:'Yellow band', band20:'Purple band', cast:'Solid cast iron, large flat base',
  ship:'Not checked', rating:'Not checked',
  flags:['34mm at 16kg, one millimeter over the REP','Handle sizes come from a reseller listing'],
  imgs:[SH('1/0332/6297/files/american-barbell-classic-kettlebell-kb-04kg-7030660.jpg')]},
 {id:'giant', sec:'hard', rank:6, brand:'Giant Lifting', name:'Kettlebells, KG (V3)', short:'Giant V3',
  url:'https://www.giantlifting.com/products/kettlebells', via:'Giant Lifting',
  p16:70.18, p20:86.38, h16:33, h20:38, hsrc:'Garage Gym Reviews', job16:'thin', job20:'yes',
  coat:'Powder coat on gravity die-cast iron', band16:'Yellow band', band20:'Purple band', cast:'Gravity die-cast, flat base',
  ship:'Not checked', rating:'Not checked',
  flags:['33mm at 16kg, the same as the REP','Handle sizes come from a review, not the maker'],
  imgs:[SH('1/0084/0214/1246/files/back_bb515194-9d8b-4d85-adc7-dd63344cef98.jpg'),SH('1/0084/0214/1246/files/giantfacing_1_35850d86-7fe5-40a1-bd9e-b1518ae8299b.jpg')]},
 {id:'rep', sec:'hard', rank:7, brand:'REP Fitness', name:'Kettlebells (kg)', short:'REP',
  url:'https://repfitness.com/products/kettlebells-kg', via:'REP',
  p16:79.99, p20:94.99, h16:33, h20:38, hsrc:'maker tech specs', job16:'thin', job20:'yes',
  coat:'Matte powder coat on gravity die-cast iron', band16:'Yellow band', band20:'Gray band', cast:'Gravity die-cast',
  ship:'Not checked', rating:'4.9★ (515)',
  flags:['Drew owns two and finds the handles a little rough','33mm at 16kg','The 20kg band is gray'],
  imgs:[SH('1/0574/1215/7598/products/Shopify-KB-3002-20-Thumbnail.jpg'),SH('1/0574/1215/7598/products/Shopify-KB-3002-16-Thumbnail.jpg')]},

 {id:'pb', sec:'comp', rank:1, brand:'Perform Better', name:'First Place Competition Kettlebell', short:'First Place',
  url:'https://www.performbetter.com/First-Place-Competition-Kettlebell_3/', via:'Perform Better',
  p16:89.95, p20:104.95, h16:35, h20:35, hsrc:'maker', job16:'yes', job20:'yes',
  coat:'Black steel body', handle:'Unpainted steel', band16:'Color-filled markings', band20:'Color-filled markings', cast:'Steel, one size at every weight',
  ship:'Not checked', rating:'Not checked',
  flags:[],
  imgs:['https://cdn11.bigcommerce.com/s-qh8opzgoqs/images/stencil/960w/products/8153/14145/media__90799.1790691512.jpg']},
 {id:'titan', sec:'comp', rank:2, brand:'Titan Fitness', name:'16 KG Competition Kettlebell', short:'Titan Competition',
  url:'https://www.titan.fitness/products/16-kg-competition-kettlebell', via:'Titan',
  p16:103.97, p20:126.97, h16:35, h20:35, hsrc:'maker', job16:'yes', job20:'yes',
  coat:'Painted steel body', handle:'Polished steel', band16:'Pink body', band20:'Not checked', cast:'Hollow-core steel, 8.3" across and 11.4" tall at every weight',
  ship:'Not checked', rating:'Not checked',
  flags:['The 16kg is pink, where competition bells are usually yellow'],
  imgs:[SH('1/0802/1508/1237/files/422163_01_05f5abf1-a5eb-4873-a482-554e095506be.jpg')]},
 {id:'bos', sec:'comp', rank:3, brand:'Bells of Steel', name:'Competition Kettlebells', short:'Bells of Steel Competition',
  url:'https://www.bellsofsteel.us/products/competition-kettlebells', via:'Bells of Steel',
  p16:109.99, p20:129.99, h16:35, h20:35, hsrc:'maker (35mm handle, 60mm window, 8kg to 48kg)', job16:'yes', job20:'yes',
  coat:'Painted steel body', handle:'Bare steel', band16:'Yellow body', band20:'Not checked', cast:'Steel, one size at every weight',
  ship:'Not checked', rating:'Not checked',
  flags:[],
  imgs:[SH('1/0654/3346/9125/files/KB16-carousel-primary_8afa9b51-e70c-4a6f-beeb-390d37a918e1.jpg')]},
];

// Used listings read on 2026-11-23. Nothing matching turned up inside the one-hour radius.
const USED = [
 {what:'Perform Better competition 16kg, one bell', price:75, where:'Bayside, NY', src:'Facebook Marketplace', url:'https://www.facebook.com/marketplace/item/4280401185602145/',
  note:'Pink paint, well worn, pickup only. A new one is $89.95 and this is a single.'},
 {what:'Rogue 20kg, listed as brand new', price:90, where:'New Windsor, NY', src:'Craigslist', url:'https://www.craigslist.org/view/d/new-windsor-rogue-fitness-kettlebells/nM2MqMWgEQAHqeR14GcksT',
  note:'$5 under Rogue’s price before shipping. The ad doesn’t say which Rogue finish.'},
 {what:'Kettlebell Kings competition 20kg, two of them', price:135, where:'New Windsor, NY', src:'Craigslist', url:'https://www.craigslist.org/view/d/new-windsor-competition-kettlebells/wzQneQjv7WRR9RjWbBApWS',
  note:'Steel competition bells, not the powder coat. The same ad has two Kettlebells USA Paradigm 16kg at $140 each. Read by a research agent, not opened by us.'},
];
const WATCH = [
 ['Kettlebell Kings powder coat 20kg at Walmart','https://www.walmart.com/ip/KETTLEBELL-KINGS-Powder-Coat-Kettebell-Weights-For-Women-and-Men-20-kg/928596148','Out of stock on November 23, sold by a third-party seller.'],
 ['Facebook Marketplace: “kettlebell kings”','https://www.facebook.com/marketplace/category/search/?query=kettlebell%20kings','Uses whatever location the account is set to.'],
 ['Facebook Marketplace: “rogue kettlebell”','https://www.facebook.com/marketplace/category/search/?query=rogue%20kettlebell','Same.'],
 ['eBay: Kettlebell Kings 20kg','https://www.ebay.com/sch/i.html?_nkw=kettlebell+kings+20kg','Not checked: eBay blocked the research fetch. A 44 lb bell costs real money to ship.'],
];

const PASSED = [
 ['Kettlebell Kings','The store page says “Store unavailable.” In August 2025 the company posted that stock had moved to Amazon; owners reported in September 2026 that Amazon had none left.','https://www.cavemantraining.com/kettlebells/what-happened-to-kettlebell-kings/'],
 ['Dragon Door RKC','Closed for online business in January 2026, per the StrongFirst forum. Its store feed now returns a payment-required error.','https://www.strongfirst.com/community/threads/dragondoor-the-end-of-an-era.28745/'],
 ['Onnit','Stopped selling fitness equipment in 2025, per its own support page.','https://support.onnit.com/hc/en-us/articles/31776847122711-Fitness-Product-Changes-at-Onnit'],
 ['Great Lakes Girya R-SPEC and P-SPEC','E-coated hardstyle bells at $120 to $199. The 16kg and 20kg were both sold out.','https://greatlakesgirya.com/products/r-spec-e-coated-hardstyle-kettlebells'],
 ['Kettlebells USA Metrixx Elite','E-coat, in stock at $139.99 for 16kg and $179.99 for 20kg. A pair of 16s is $280, the 20 is over the $150 ceiling, and the page doesn’t give a handle size.','https://www.kettlebellsusa.com/products/metrixx-elite-precision-ecoat-cast-iron-kettlebell'],
 ['Bells of Steel Powder Coated','$84.99 and $99.99 with yellow and purple bands, but no handle size per weight on the page.','https://www.bellsofsteel.us/products/powder-coated-kettlebells'],
 ['Again Faster PRx Powder Coated','$79.99 and $89.99. Handle sizes reported as 33mm and 38mm, the same as REP, so the 16 gains nothing.','https://www.againfaster.com/products/prx-powder-coated-cast-iron-kettlebells'],
 ['Titan Cast Iron','$75.97 and $104.99. Reported at 33mm for the 16kg.','https://www.titan.fitness/products/16-kg-cast-iron-kettlebell'],
 ['Rogue Competition','$128 and $143 with a 33mm handle, thinner than the 35mm competition handle Drew already likes.','https://www.roguefitness.com/rogue-competition-kettlebells'],
 ['American Barbell Competition','$210 for the 16kg, and sold out.','https://americanbarbell.com/products/competition-kettlebells'],
];

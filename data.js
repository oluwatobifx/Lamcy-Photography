// =============================================================
//  Lamcy Photography & Videography: site data
//  Edit this file to change contact details, prices or photos.
// =============================================================

// ---- Contact --------------------------------------------------
// WhatsApp number in international format, digits only (no +, no spaces).
// PLACEHOLDER: replace with Lamcy's real WhatsApp number.
export const CONTACT = {
  whatsapp: '2348000000000',
  whatsappIsPlaceholder: true,
  email: 'hello@lamcy.example',
  city: 'Lagos, Nigeria',
  instagram: 'lamcyphotography',
};

export const CURRENCY = '₦';

// ---- Photos -----------------------------------------------------
// Sample photos from Unsplash (free to use under the Unsplash License).
// Swap `src` for Lamcy's own photos later: any full https:// image URL works,
// or put files in /img and use '/img/your-photo.jpg'.
const U = (id) => `https://images.unsplash.com/${id}`;
const P = (id, alt, by, page) => ({ src: U(id), alt, by, credit: `https://unsplash.com${page}?utm_source=lamcy&utm_medium=referral` });

export const PHOTOS = {
  w1: P('photo-1529519195486-16945f0fb37f', 'A bride and groom holding hands, the ring in focus', 'Alekon pictures', '/photos/couple-holding-hands-yj4kwA4h_Ms'),
  w2: P('photo-1608009232260-9b527a5bb9bd', 'Newlyweds walking out of the church with their guests', 'Steward Masweneng', '/photos/man-in-black-suit-jacket-and-woman-in-white-wedding-dress-BC6s0iEa_CQ'),
  w3: P('photo-1660675133902-acd1b057f75d', 'Guests in colourful traditional dress at a wedding reception', 'Emmanuel Yeboah Okine', '/photos/a-group-of-people-in-traditional-dress-RCAUud6Wcmo'),
  w4: P('photo-1695281536457-01f9a07c575b', 'A bride and groom embracing under a flowering tree', 'Samwel francis', '/photos/a-bride-and-groom-embracing-under-a-tree-OyhCn_7YoQo'),
  w5: P('photo-1661332517932-2d441bfb2994', 'A couple in matching traditional attire at their engagement', 'Tope. A Asokere', '/photos/a-man-and-woman-wearing-traditional-clothing-nRrFmCS6vTE'),
  w6: P('photo-1784202388427-5c92c7a165a6', 'Guests dancing joyfully at an outdoor evening party', 'Amari Shutters', '/photos/men-and-women-dancing-joyfully-at-an-outdoor-event-1Cz07Xm3lvY'),
  p1: P('photo-1593351799227-75df2026356b', 'Studio portrait of a woman with a leaf crown', 'Divine Effiong', '/photos/woman-with-green-and-white-flower-on-ear-h1lA3N5wb8M'),
  p2: P('photo-1645736353780-e70a7d508088', 'A smiling woman with locs in warm light', 'Dellon Thomas', '/photos/a-woman-with-dreadlocks-is-smiling-at-the-camera-eXclz2FOr0M'),
  p3: P('photo-1636144896336-b056be4a8dfe', 'A woman in a black suit, moody studio portrait', 'Mo Darbz', '/photos/a-woman-in-a-black-suit-posing-for-a-picture-PyKXKwfgh9E'),
  p4: P('photo-1662532577856-e8ee8b138a8b', 'A woman in a red outfit against a clear blue sky', 'Marjan Taghipour', '/photos/woman-in-red-outfit-against-sky-1tjMpBTvFAA'),
  p5: P('photo-1760320483828-38877a11549b', 'A woman in a suit seated on a stool, black and white', 'Ben Iwara', '/photos/a-woman-in-a-suit-sits-on-a-chair-aHUu0fUdhbQ'),
  p6: P('photo-1527203561188-dae1bc1a417f', 'Profile of a woman with a braided ponytail on a tan backdrop', 'Jessica Felicio', '/photos/woman-profile-with-braided-ponytail-QS9ZX5UnS14'),
  b1: P('photo-1765530950709-67e6af4ce3ad', 'Children celebrating a birthday with balloons and cake', 'john renzzel', '/photos/children-celebrating-a-birthday-party-with-balloons-and-cake-uFE1OelerPk'),
  b2: P('photo-1577998474517-7eeeed4e448a', 'A birthday cake topped with a lit sparkler', 'Storiès', '/photos/cake-with-lit-sparkling-stick-ys8qztLjJyg'),
  b3: P('photo-1770135005669-0094609c733e', 'Friends raising a toast at a celebration', 'Desiray Green', '/photos/friends-toasting-with-champagne-at-a-celebration-4OjvrEGyf6A'),
  b4: P('photo-1530103862676-de8c9debad1d', 'Colourful party balloons against the ceiling', 'Adi Goldstein', '/photos/selective-focus-photography-of-assorted-color-balloons-Hli3R6LKibo'),
  s1: P('photo-1788462811028-14d4e80bf6de', 'Parents-to-be hugging at a gender reveal with pink smoke', 'gabbiistudios', '/photos/people-hugging-at-gender-reveal-celebration-PbWiCFGvy8k'),
  s2: P('photo-1768776183122-95c7d3adbf3e', 'Giant BABY letters with pastel balloons', 'Samuel Lopez Cruz', '/photos/large-illuminated-letters-spell-out-baby-with-balloons-qulJcsLyIHM'),
  s3: P('photo-1702360681796-6aa6d4f569f9', 'An expecting couple on the beach at sunrise', 'Asdrubal luna', '/photos/a-pregnant-couple-standing-on-the-beach-with-the-ocean-in-the-background-TFARf1kGFLA'),
  s4: P('photo-1489674297774-eadf82cba14c', 'Black and white maternity portrait', 'Janko Ferlič', '/photos/pregnant-woman-holding-tummy--pGlq8NKUto'),
  d1: P('photo-1757589227072-0dd17af42433', 'A floral archway and aisle set for a wedding ceremony', 'Bruno Ngarukiye', '/photos/floral-archway-with-chairs-set-for-a-wedding-ceremony-zZ4hsQfse7o'),
  d2: P('photo-1767050292710-8e5da59ec5d8', 'A table set with florals, blush plates and gold cutlery', 'Katie Puzatova', '/photos/elegant-table-setting-with-floral-arrangements-and-gold-cutlery-mGNSYZrl1F0'),
  d3: P('photo-1769812343285-ec0775437680', 'A reception hall dressed with white florals', 'Jonathan Borba', '/photos/elegantly-decorated-tables-for-a-formal-event-with-floral-arrangements-KjwadmwCMXs'),
  d4: P('photo-1519167758481-83f550bb49b3', 'A banquet hall with round tables ready for guests', 'Ibrahim Boran', '/photos/formal-dinner-table-setting-m8YjB0noWiY'),
  v1: P('photo-1763280290224-1b7ed510a31e', 'A camera operator filming a live event under stage lights', 'Ayrus Hill', '/photos/cameraman-filming-with-professional-equipment-at-event-kaOkKC5ehoE'),
  v2: P('photo-1625690303837-654c9666d2d0', 'A cinema camera on a tripod in coloured haze', 'Jakob Owens', '/photos/person-filming-with-camera-in-light-kbd1oAf-9Ms'),
  v3: P('photo-1758613655976-e8c8f85849a2', 'A photographer directing a model in the studio', 'Vitaly Gariev', '/photos/photographer-taking-picture-of-model-in-studio-aHcQk7dqVrI'),
  v4: P('photo-1611784728558-6c7d9b409cdf', 'A videographer checking a shot on a handheld rig', 'Kyle Loftus', '/photos/man-in-white-t-shirt-holding-black-video-camera-DqmXihYx5UE'),
};

// ---- The book --------------------------------------------------
// Each entry is one page. Layouts:
//   single  = one photo filling the page
//   pair    = two photos side by side (portrait photos)
//   duo     = two photos stacked (landscape photos)
//   feature = one landscape photo with a short line of text
// `chapter` starts a new chapter (shown at the top of that page).
export const CHAPTERS = [
  { id: 'weddings', title: 'Weddings' },
  { id: 'portraits', title: 'Portraits & Fashion' },
  { id: 'birthdays', title: 'Birthdays' },
  { id: 'showers', title: 'Baby Showers & Maternity' },
  { id: 'events', title: 'Events & Décor' },
  { id: 'studio', title: 'Behind the Camera' },
];

export const PAGES = [
  { layout: 'single', chapter: 'weddings', photos: ['w1'], caption: 'The promise, held in one frame.' },
  { layout: 'duo', photos: ['w2', 'w3'], caption: 'Church doors and colourful receptions.' },
  { layout: 'single', photos: ['w4'], caption: 'Quiet moments between the ceremonies.' },
  { layout: 'duo', photos: ['w5', 'w6'], caption: 'Tradition, culture and the dance floor.' },
  { layout: 'single', chapter: 'portraits', photos: ['p1'], caption: 'Studio light, natural grace.' },
  { layout: 'pair', photos: ['p2', 'p3'], caption: 'Warm smiles and bold statements.' },
  { layout: 'feature', photos: ['p4'], quote: 'Every face tells a story. We make sure it is told beautifully.' },
  { layout: 'pair', photos: ['p5', 'p6'], caption: 'Editorial portraits for brands and creatives.' },
  { layout: 'single', chapter: 'birthdays', photos: ['b1'], caption: 'Little ones, big celebrations.' },
  { layout: 'pair', photos: ['b2', 'b3'], caption: 'Candles, cake and cheers.' },
  { layout: 'feature', photos: ['b4'], quote: 'Your milestone deserves more than a phone camera.' },
  { layout: 'duo', chapter: 'showers', photos: ['s1', 's2'], caption: 'Reveals, balloons and happy tears.' },
  { layout: 'pair', photos: ['s3', 's4'], caption: 'Maternity sessions by the sea or in the studio.' },
  { layout: 'single', chapter: 'events', photos: ['d1'], caption: 'Floral aisles we design and build.' },
  { layout: 'pair', photos: ['d2', 'd3'], caption: 'Tables and halls dressed to impress.' },
  { layout: 'feature', photos: ['d4'], quote: 'From planning to the last petal, we handle every detail.' },
  { layout: 'single', chapter: 'studio', photos: ['v1'], caption: 'Live event coverage in 4K.' },
  { layout: 'duo', photos: ['v2', 'v3'], caption: 'Cinema cameras and a full studio.' },
  { layout: 'feature', photos: ['v4'], quote: 'Ready when you are. Book your session today.', cta: true },
];

// ---- Booking services and prices -------------------------------
// All prices are in Naira and are SAMPLE prices: change them freely.
// Field types:
//   choice  = pick one option; its price is added
//   number  = a count or duration; every unit above `included` costs `unitPrice`
//   addons  = tick any extras; each adds its price
export const SERVICES = [
  {
    id: 'photoshoot', name: 'Photoshoot', icon: 'camera',
    blurb: 'Studio or outdoor sessions for portraits, couples, brands and fashion.',
    dateLabel: 'Shoot date',
    fields: [
      { type: 'choice', id: 'package', label: 'Package', options: [
        { label: 'Studio Basic: 10 edited photos', price: 50000 },
        { label: 'Outdoor Lifestyle: 20 edited photos', price: 85000 },
        { label: 'Premium Studio + Outdoor: 35 edited photos', price: 150000 },
      ] },
      { type: 'number', id: 'hours', label: 'Duration', unit: 'hour', min: 1, max: 10, value: 1, included: 1, unitPrice: 25000, note: 'First hour included' },
      { type: 'number', id: 'outfits', label: 'Outfit changes', unit: 'outfit', min: 1, max: 8, value: 1, included: 1, unitPrice: 10000, note: 'One outfit included' },
      { type: 'addons', id: 'extras', label: 'Extras', options: [
        { label: 'Makeup artist', price: 30000 },
        { label: 'Printed photobook (20 pages)', price: 45000 },
        { label: 'Express delivery in 48 hours', price: 20000 },
      ] },
    ],
  },
  {
    id: 'videography', name: 'Videography', icon: 'video',
    blurb: 'Music videos, adverts, short films and interviews, shot and edited in 4K.',
    dateLabel: 'Shoot date',
    fields: [
      { type: 'choice', id: 'kind', label: 'Type of video', options: [
        { label: 'Interview or podcast', price: 120000 },
        { label: 'Advert or brand video', price: 200000 },
        { label: 'Music video', price: 250000 },
        { label: 'Short film', price: 350000 },
      ] },
      { type: 'number', id: 'hours', label: 'Shooting time', unit: 'hour', min: 1, max: 12, value: 2, included: 2, unitPrice: 40000, note: 'First 2 hours included' },
      { type: 'number', id: 'cameras', label: 'Cameras', unit: 'camera', min: 1, max: 4, value: 1, included: 1, unitPrice: 50000, note: 'One camera included' },
      { type: 'choice', id: 'length', label: 'Final video length', options: [
        { label: 'Up to 3 minutes', price: 0 },
        { label: '3 to 10 minutes', price: 60000 },
        { label: 'Over 10 minutes', price: 120000 },
      ] },
      { type: 'addons', id: 'extras', label: 'Extras', options: [
        { label: 'Drone shots', price: 70000 },
        { label: 'Lighting kit', price: 40000 },
        { label: 'Behind-the-scenes clip', price: 30000 },
        { label: 'Express edit in 3 days', price: 50000 },
      ] },
    ],
  },
  {
    id: 'birthday', name: 'Birthday shoot', icon: 'cake',
    blurb: 'Pre-birthday portraits or full party coverage for kids and adults.',
    dateLabel: 'Birthday date',
    fields: [
      { type: 'choice', id: 'setting', label: 'Where', options: [
        { label: 'In our studio', price: 60000 },
        { label: 'At home', price: 80000 },
        { label: 'At the party venue', price: 120000 },
      ] },
      { type: 'number', id: 'hours', label: 'Duration', unit: 'hour', min: 1, max: 10, value: 2, included: 2, unitPrice: 25000, note: 'First 2 hours included' },
      { type: 'addons', id: 'extras', label: 'Extras', options: [
        { label: 'Cake-smash set-up', price: 35000 },
        { label: 'Highlight video reel', price: 70000 },
        { label: 'Second photographer', price: 50000 },
        { label: 'Printed photobook (20 pages)', price: 45000 },
      ] },
    ],
  },
  {
    id: 'babyshower', name: 'Baby shower shoot', icon: 'baby',
    blurb: 'Baby showers, gender reveals and maternity sessions.',
    dateLabel: 'Event date',
    fields: [
      { type: 'choice', id: 'package', label: 'Package', options: [
        { label: 'Essentials: 50 edited photos', price: 90000 },
        { label: 'Signature: 100 edited photos + short reel', price: 150000 },
        { label: 'Luxury: unlimited photos + full video', price: 230000 },
      ] },
      { type: 'number', id: 'hours', label: 'Duration', unit: 'hour', min: 1, max: 10, value: 3, included: 3, unitPrice: 30000, note: 'First 3 hours included' },
      { type: 'addons', id: 'extras', label: 'Extras', options: [
        { label: 'Maternity session before the event', price: 60000 },
        { label: 'Backdrop and props', price: 40000 },
        { label: 'Video highlight reel', price: 80000 },
        { label: 'Printed photobook (20 pages)', price: 45000 },
      ] },
    ],
  },
  {
    id: 'coverage', name: 'Video coverage', icon: 'film',
    blurb: 'Full event coverage: weddings, engagements, church, corporate and parties.',
    dateLabel: 'Event date',
    fields: [
      { type: 'choice', id: 'event', label: 'Event', options: [
        { label: 'Wedding', price: 300000 },
        { label: 'Traditional engagement', price: 250000 },
        { label: 'Corporate event or conference', price: 200000 },
        { label: 'Church or religious service', price: 150000 },
        { label: 'Party or birthday', price: 150000 },
      ] },
      { type: 'number', id: 'hours', label: 'Coverage time', unit: 'hour', min: 1, max: 16, value: 4, included: 4, unitPrice: 40000, note: 'First 4 hours included' },
      { type: 'number', id: 'cameras', label: 'Cameras', unit: 'camera', min: 1, max: 5, value: 1, included: 1, unitPrice: 60000, note: 'One camera included' },
      { type: 'addons', id: 'extras', label: 'Extras', options: [
        { label: 'Drone coverage', price: 80000 },
        { label: 'Live streaming', price: 120000 },
        { label: 'Same-day highlight video', price: 100000 },
        { label: 'Full documentary edit', price: 90000 },
      ] },
    ],
  },
  {
    id: 'planning', name: 'Event planning & decorations', icon: 'flower',
    blurb: 'Planning, coordination and décor: florals, balloons, stages and table settings.',
    dateLabel: 'Event date',
    fields: [
      { type: 'choice', id: 'style', label: 'Décor style', options: [
        { label: 'Classic', price: 300000 },
        { label: 'Luxury', price: 600000 },
        { label: 'Royal', price: 1000000 },
      ] },
      { type: 'number', id: 'guests', label: 'Guests', unit: 'guest', min: 10, max: 2000, step: 10, value: 50, included: 50, unitPrice: 2000, note: 'Up to 50 guests included' },
      { type: 'number', id: 'days', label: 'Event duration', unit: 'day', min: 1, max: 7, value: 1, included: 1, unitPrice: 150000, note: 'One day included' },
      { type: 'addons', id: 'extras', label: 'Extras', options: [
        { label: 'Full planning and coordination', price: 250000 },
        { label: 'Balloon arch', price: 60000 },
        { label: 'Floral installations', price: 150000 },
        { label: 'Stage and backdrop', price: 180000 },
        { label: 'Lighting and drapes', price: 120000 },
      ] },
    ],
  },
  {
    id: 'flyer', name: 'Flyer design', icon: 'pen',
    blurb: 'Eye-catching flyers for events, birthdays, churches and businesses.',
    dateLabel: 'Needed by', noTime: true, noLocation: true,
    fields: [
      { type: 'choice', id: 'kind', label: 'Flyer type', options: [
        { label: 'Birthday flyer', price: 12000 },
        { label: 'Event flyer', price: 15000 },
        { label: 'Church programme or flyer', price: 18000 },
        { label: 'Business promo flyer', price: 20000 },
      ] },
      { type: 'number', id: 'designs', label: 'Number of designs', unit: 'design', min: 1, max: 20, value: 1, included: 1, unitPrice: 10000, note: 'One design included' },
      { type: 'addons', id: 'extras', label: 'Extras', options: [
        { label: 'Print-ready file', price: 5000 },
        { label: 'Animated flyer for social media', price: 25000 },
        { label: 'Extra round of changes', price: 5000 },
        { label: 'Rush delivery in 24 hours', price: 10000 },
      ] },
    ],
  },
];

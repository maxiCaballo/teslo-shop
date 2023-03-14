import bcrypt from 'bcryptjs';

//* Seed interfaces
interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: ValidGender;
}

interface SeedUser {
  name: string;
  email: string;
  password?: string;
  role: ValidRole;
}

//* Seed types
type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
type ValidGender = 'men' | 'women' | 'kid' | 'unisex';
type ValidRole = 'client' | 'admin';

interface SeedData {
  users: SeedUser[];
  products: SeedProduct[];
}

//Datos iniciales para popular la base de datos.
export const initialData: SeedData = {
  users: [
    {
      name: 'client',
      email: 'client@client.com',
      password: bcrypt.hashSync('123456'),
      role: 'client'
    },
    {
      name: 'admin',
      email: 'admin@admin.com',
      password: bcrypt.hashSync('123456'),
      role: 'admin'
    }
  ],
  products: [
    {
      description:
        'Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678822924/teslo-shop/g3mv3of33o4m8s3cc3v6.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823061/teslo-shop/ucmakpyp0ol1nd8nhtjy.webp'
      ],
      inStock: 7,
      price: 75,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'mens_chill_crew_neck_sweatshirt',
      type: 'shirts',
      tags: ['sweatshirt'],
      title: 'Men’s Chill Crew Neck Sweatshirt',
      gender: 'men'
    },
    {
      description:
        "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823183/teslo-shop/mnsbbpv7c8fzn5ozip8o.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823380/teslo-shop/gaazcfcjmev9bkkzlhtx.jpg'
      ],
      inStock: 5,
      price: 200,
      sizes: ['XS', 'S', 'M', 'XL', 'XXL'],
      slug: 'men_quilted_shirt_jacket',
      type: 'shirts',
      tags: ['jacket'],
      title: "Men's Quilted Shirt Jacket",
      gender: 'men'
    },
    {
      description:
        "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823414/teslo-shop/ny80rcdawzpqtvmqjhz8.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823441/teslo-shop/hezco51dwll4itddpbut.webp'
      ],
      inStock: 10,
      price: 130,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      slug: 'men_raven_lightweight_zip_up_bomber_jacket',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Raven Lightweight Zip Up Bomber Jacket",
      gender: 'men'
    },
    {
      description:
        "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823476/teslo-shop/jilcolitkucscblsbf2l.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823500/teslo-shop/wlgh2zsyngtvftchylz6.webp'
      ],
      inStock: 50,
      price: 45,
      sizes: ['XS', 'S', 'M', 'L'],
      slug: 'men_turbine_long_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Turbine Long Sleeve Tee",
      gender: 'men'
    },
    {
      description:
        "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823533/teslo-shop/jrpnieko0xz0wbvedrbv.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823547/teslo-shop/wwt0wmclrqtix9ug2iry.webp'
      ],
      inStock: 50,
      price: 40,
      sizes: ['M', 'L', 'XL', 'XXL'],
      slug: 'men_turbine_short_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Turbine Short Sleeve Tee",
      gender: 'men'
    },
    {
      description:
        'Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton and features our signature Cybertruck icon on the back.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823582/teslo-shop/zxkpnom2z8ebjodul9jr.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823589/teslo-shop/nxb6bcydig6zkeji0quu.webp'
      ],
      inStock: 0,
      price: 35,
      sizes: ['M', 'L', 'XL', 'XXL'],
      slug: 'men_cybertruck_owl_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Cybertruck Owl Tee",
      gender: 'men'
    },
    {
      description:
        "Inspired by our fully integrated home solar and storage system, the Tesla Solar Roof Tee advocates for clean, sustainable energy wherever you go. Designed for fit, comfort and style, the tee features an aerial view of our seamless Solar Roof design on the front with our signature T logo above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823627/teslo-shop/ytljs5xgttyhevpq5ubs.jpg',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823644/teslo-shop/alyn9jb9fozwwcuu7w24.webp'
      ],
      inStock: 15,
      price: 35,
      sizes: ['S', 'M', 'L', 'XL'],
      slug: 'men_solar_roof_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Solar Roof Tee",
      gender: 'men'
    },
    {
      description:
        "Inspired by the world’s most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823688/teslo-shop/jg0qyhfq61pig1l0vmp3.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823698/teslo-shop/puhstrbjfplpcpfnvmak.webp'
      ],
      inStock: 17,
      price: 35,
      sizes: ['XS', 'S', 'XL', 'XXL'],
      slug: 'men_let_the_sun_shine_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Let the Sun Shine Tee",
      gender: 'men'
    },
    {
      description:
        "Designed for fit, comfort and style, the Men's 3D Large Wordmark Tee is made from 100% Peruvian cotton with a 3D silicone-printed Tesla wordmark printed across the chest.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823734/teslo-shop/dkvl1mxy2npyhtjtfdnz.jpg',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823770/teslo-shop/g5b3ghc4z5nl93cmn76m.jpg'
      ],
      inStock: 12,
      price: 35,
      sizes: ['XS', 'S', 'M'],
      slug: 'men_3d_large_wordmark_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's 3D Large Wordmark Tee",
      gender: 'men'
    },
    {
      description:
        'Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823811/teslo-shop/soxp8w3agos8wfcpaixf.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823824/teslo-shop/nyrs2ww4ordofussvkbg.webp'
      ],
      inStock: 5,
      price: 35,
      sizes: ['XS', 'S'],
      slug: 'men_3d_t_logo_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's 3D T Logo Tee",
      gender: 'men'
    },
    {
      description:
        'Designed for comfort and style in any size, the Tesla Small Wordmark Tee is made from 100% Peruvian cotton and features a 3D silicone-printed wordmark on the left chest.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823937/teslo-shop/wngzj45kji9skjomu9wo.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823880/teslo-shop/lmocacoh7tvpjfsk78xe.webp'
      ],
      inStock: 2,
      price: 35,
      sizes: ['XS', 'S', 'M'],
      slug: 'men_3d_small_wordmark_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Men’s 3D Small Wordmark Tee',
      gender: 'men'
    },
    {
      description:
        "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824010/teslo-shop/pin2nr0hrelydtayldfu.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678823999/teslo-shop/nonad58cyr1oix0uutxe.webp'
      ],
      inStock: 82,
      price: 35,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'men_plaid_mode_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Plaid Mode Tee",
      gender: 'men'
    },
    {
      description:
        "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any environment.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824053/teslo-shop/dxiiegqyxrlcv7ztssn1.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824041/teslo-shop/c9uxdfs3lpepazhy6onk.webp'
      ],
      inStock: 24,
      price: 35,
      sizes: ['XL', 'XXL'],
      slug: 'men_powerwall_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Powerwall Tee",
      gender: 'men'
    },
    {
      description:
        'Inspired by Tesla Battery Day and featuring the unveiled tabless battery cell, Battery Day Tee celebrates the future of energy storage and cell manufacturing. Designed for fit, comfort and style, Battery Day Tee is made from 100% cotton with a stylized cell printed across the chest. Made in Peru.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824098/teslo-shop/a8bglznj3v9bqhzczqlu.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824105/teslo-shop/pfdvdw55h6ohqpwq9mc4.webp'
      ],
      inStock: 5,
      price: 30,
      sizes: ['XS', 'S', 'XXL'],
      slug: 'men_battery_day_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Battery Day Tee",
      gender: 'men'
    },
    {
      description:
        'Designed for exceptional comfort and inspired by the Cybertruck unveil event, the Cybertruck Bulletproof Tee is made from 100% cotton and features our signature Cybertruck icon on the back.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824134/teslo-shop/rlr9i6ilaym4tasiwllx.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824141/teslo-shop/nqrkjgoyowhrcjxffsz9.webp'
      ],
      inStock: 150,
      price: 30,
      sizes: ['M', 'L'],
      slug: 'men_cybertruck_bulletproof_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Men’s Cybertruck Bulletproof Tee',
      gender: 'men'
    },
    {
      description:
        'Inspired by the Model Y order confirmation graphic, the limited edition Haha Yes Tee is designed for comfort and style. Made from 100% Peruvian cotton and featuring the Tesla wordmark across the chest, the exclusive tee will commemorate your order for years to come.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824184/teslo-shop/z2ohwjit7mu0xhkqvina.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824173/teslo-shop/h07b2vkhkqfqo9hbut6b.webp'
      ],
      inStock: 10,
      price: 35,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'men_haha_yes_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Haha Yes Tee",
      gender: 'men'
    },
    {
      description:
        'Designed for fit, comfort and style, the limited edition S3XY Tee is made from 100% cotton with a 3D silicone-printed “S3XY” logo across the chest. Made in Peru. Available in black.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824289/teslo-shop/kozjpqgnfahsiybxfsdn.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824297/teslo-shop/pznpvvbgpi4dz1t2daua.jpg'
      ],
      inStock: 34,
      price: 35,
      sizes: ['XS', 'S', 'M', 'L'],
      slug: 'men_s3xy_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's S3XY Tee",
      gender: 'men'
    },
    {
      description:
        "Designed for fit, comfort and style, the Men's 3D Wordmark Long Sleeve Tee is made from 100% cotton and features an understated wordmark logo on the left chest.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824324/teslo-shop/ptjynqzyyuzzcojvjugn.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824332/teslo-shop/imurm2zbdyop8l7b2gls.webp'
      ],
      inStock: 15,
      price: 40,
      sizes: ['XL', 'XXL'],
      slug: 'men_3d_wordmark_long_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's 3D Wordmark Long Sleeve Tee",
      gender: 'men'
    },
    {
      description:
        "Designed for fit, comfort and style, the Men's 3D T Logo Long Sleeve Tee is made from 100% cotton and features an understated T logo on the left chest.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824360/teslo-shop/l8mx7a8px6g8xz4ljuhm.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824371/teslo-shop/ot3z35pem4s8exnottlr.jpg'
      ],
      inStock: 12,
      price: 40,
      sizes: ['XS', 'XXL'],
      slug: 'men_3d_t_logo_long_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's 3D T Logo Long Sleeve Tee",
      gender: 'men'
    },
    {
      description:
        "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Hoodie has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve with a french terry interior for versatility in any season. Made from 70% bamboo and 30% cotton.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824405/teslo-shop/euum1skgytl0pjhpw8xv.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824415/teslo-shop/qfwv7blp0ybtgsoodvp1.webp'
      ],
      inStock: 10,
      price: 115,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'men_raven_lightweight_hoodie',
      type: 'hoodies',
      tags: ['hoodie'],
      title: "Men's Raven Lightweight Hoodie",
      gender: 'men'
    },
    {
      description:
        'Introducing the Tesla Chill Collection. The Chill Pullover Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The unisex hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824440/teslo-shop/imobmyv9gfjilyuviowv.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824446/teslo-shop/ecg4v4rjkpapo8gwnvug.webp'
      ],
      inStock: 10,
      price: 130,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'chill_pullover_hoodie',
      type: 'hoodies',
      tags: ['hoodie'],
      title: 'Chill Pullover Hoodie',
      gender: 'unisex'
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Men's Chill Full Zip Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824474/teslo-shop/k3sw6zs1pblmjmmvne8s.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824481/teslo-shop/o4owkimgtyu2kjbi6ib7.webp'
      ],
      inStock: 100,
      price: 85,
      sizes: ['XS', 'L', 'XL', 'XXL'],
      slug: 'men_chill_full_zip_hoodie',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Chill Full Zip Hoodie",
      gender: 'men'
    },
    {
      description:
        'Introducing the Tesla Chill Collection. The Men’s Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824504/teslo-shop/s1henfmyknp2nyqi9nxt.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824513/teslo-shop/l4drez28pnuda9dt4l9m.jpg'
      ],
      inStock: 7,
      price: 85,
      sizes: ['XS', 'S', 'M'],
      slug: 'men_chill_quarter_zip_pullover_-_gray',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Chill Quarter Zip Pullover - Gray",
      gender: 'men'
    },
    {
      description:
        'Introducing the Tesla Chill Collection. The Men’s Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824555/teslo-shop/bktw3ynmfy1s1tm2mufs.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824562/teslo-shop/wlgn5duvtwgsn47x2lc0.jpg'
      ],
      inStock: 15,
      price: 85,
      sizes: ['XS', 'S', 'M', 'L'],
      slug: 'men_chill_quarter_zip_pullover_-_white',
      type: 'shirts',
      tags: ['shirt'],
      title: "Men's Chill Quarter Zip Pullover - White",
      gender: 'men'
    },
    {
      description:
        'The Unisex 3D Large Wordmark Pullover Hoodie features soft fleece and an adjustable, jersey-lined hood for comfort and coverage. Designed in a unisex style, the pullover hoodie includes a tone-on-tone 3D silicone-printed wordmark across the chest.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824636/teslo-shop/fzqvussn5vwbvgsm6qzf.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824644/teslo-shop/eafvnounvkrhklrnw47n.webp'
      ],
      inStock: 15,
      price: 70,
      sizes: ['XS', 'S', 'XL', 'XXL'],
      slug: '3d_large_wordmark_pullover_hoodie',
      type: 'hoodies',
      tags: ['hoodie'],
      title: '3D Large Wordmark Pullover Hoodie',
      gender: 'unisex'
    },
    {
      description:
        'As with the iconic Tesla logo, the Cybertruck Graffiti Hoodie is a classic in the making. Unisex style featuring soft fleece and an adjustable, jersey-lined hood for comfortable coverage.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824669/teslo-shop/hirkcz0vcehg5vnkf3cy.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824678/teslo-shop/eb7znkylbol9xzdflj4f.webp'
      ],
      inStock: 13,
      price: 60,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'cybertruck_graffiti_hoodie',
      type: 'hoodies',
      tags: ['hoodie'],
      title: 'Cybertruck Graffiti Hoodie',
      gender: 'unisex'
    },
    {
      description:
        'The Relaxed T Logo Hat is a classic silhouette combined with modern details, featuring a 3D T logo and a custom metal buckle closure. The ultrasoft design is flexible and abrasion resistant, while the inner sweatband includes quilted padding for extra comfort and moisture wicking. The visor is fully made from recycled plastic bottles. 100% Cotton.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824701/teslo-shop/q6grlfyq4gywpisloggi.jpg',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824707/teslo-shop/rm7sotmx0coahvtfesev.jpg'
      ],
      inStock: 11,
      price: 30,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'relaxed_t_logo_hat',
      type: 'hats',
      tags: ['hats'],
      title: 'Relaxed T Logo Hat',
      gender: 'unisex'
    },
    {
      description:
        'The Relaxed T Logo Hat is a classic silhouette combined with modern details, featuring a 3D T logo and a custom metal buckle closure. The ultrasoft design is flexible and abrasion resistant, while the inner sweatband includes quilted padding for extra comfort and moisture wicking. The visor is fully made from recycled plastic bottles. 100% Cotton.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824735/teslo-shop/rxsvhc5pet6fgfiadlvh.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824763/teslo-shop/cxlabwpk5s4a4al2yzj8.webp'
      ],
      inStock: 13,
      price: 35,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'thermal_cuffed_beanie',
      type: 'hats',
      tags: ['hats'],
      title: 'Thermal Cuffed Beanie',
      gender: 'unisex'
    },
    {
      description:
        "The Women's Cropped Puffer Jacket features a uniquely cropped silhouette for the perfect, modern style while on the go during the cozy season ahead. The puffer features subtle silicone injected Tesla logos below the back collar and on the right sleeve, custom matte metal zipper pulls and a soft, fleece lined collar. Made from 87% nylon and 13% polyurethane.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824791/teslo-shop/z7nefrz5vz9oz38j9xic.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824798/teslo-shop/tceopuctsy3pe8rsksxj.webp'
      ],
      inStock: 85,
      price: 225,
      sizes: ['XS', 'S', 'M'],
      slug: 'women_cropped_puffer_jacket',
      type: 'hoodies',
      tags: ['hoodie'],
      title: "Women's Cropped Puffer Jacket",
      gender: 'women'
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Women's Chill Half Zip Cropped Hoodie has a premium, soft fleece exterior and cropped silhouette for comfort in everyday lifestyle. The hoodie features an elastic hem that gathers at the waist, subtle thermoplastic polyurethane Tesla logos along the hood and on the sleeve, a double layer single seam hood and a custom ring zipper pull. Made from 60% cotton and 40% recycled polyester.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824967/teslo-shop/tcgblxugy2ebmtlbxpmm.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678824977/teslo-shop/rstczfmjelnrrmnfx10m.webp'
      ],
      inStock: 10,
      price: 130,
      sizes: ['XS', 'S', 'M', 'XXL'],
      slug: 'women_chill_half_zip_cropped_hoodie',
      type: 'hoodies',
      tags: ['hoodie'],
      title: "Women's Chill Half Zip Cropped Hoodie",
      gender: 'women'
    },
    {
      description:
        "Introducing the Tesla Raven Collection. The Women's Raven Slouchy Crew Sweatshirt has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The slouchy crew features a subtle thermoplastic polyurethane Tesla wordmark on the left sleeve and a french terry interior for a cozy look and feel in every season. Pair it with your Raven Joggers or favorite on the go fit. Made from 70% bamboo and 30% cotton.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825001/teslo-shop/tlgs4vatxjywka1acpn2.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825009/teslo-shop/ygkrvioc0rhu3refmxih.webp'
      ],
      inStock: 9,
      price: 110,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'women_raven_slouchy_crew_sweatshirt',
      type: 'hoodies',
      tags: ['hoodie'],
      title: "Women's Raven Slouchy Crew Sweatshirt",
      gender: 'women'
    },
    {
      description:
        "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Women's Turbine Cropped Long Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style with a cropped silhouette. Made from 50% cotton and 50%",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825032/teslo-shop/chhsmtf8ybeaupsozucu.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825040/teslo-shop/dizgahhsolikrhgija03.webp'
      ],
      inStock: 10,
      price: 45,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'women_turbine_cropped_long_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Women's Turbine Cropped Long Sleeve Tee",
      gender: 'women'
    },
    {
      description:
        "ntroducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Women's Turbine Cropped Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style with a cropped silhouette. Made from 50% cotton and 50% polyester.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825098/teslo-shop/nka417ui4zekifiiichu.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825107/teslo-shop/kfg81wnjlzbf1qee1b8x.webp'
      ],
      inStock: 0,
      price: 40,
      sizes: ['XS', 'S'],
      slug: 'women_turbine_cropped_short_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Women's Turbine Cropped Short Sleeve Tee",
      gender: 'women'
    },
    {
      description:
        "Designed for style and comfort, the ultrasoft Women's T Logo Short Sleeve Scoop Neck Tee features a tonal 3D silicone-printed T logo on the left chest. Made of 50% Peruvian cotton and 50% Peruvian viscose.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825133/teslo-shop/vgao8husojs5xyhfmc2a.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825140/teslo-shop/asbndp24btzmlfsi0vb3.jpg'
      ],
      inStock: 30,
      price: 35,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'women_t_logo_short_sleeve_scoop_neck_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Women's T Logo Short Sleeve Scoop Neck Tee",
      gender: 'women'
    },
    {
      description:
        "Designed for style and comfort, the ultrasoft Women's T Logo Long Sleeve Scoop Neck Tee features a tonal 3D silicone-printed T logo on the left chest. Made of 50% Peruvian cotton and 50% Peruvian viscose.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825164/teslo-shop/msqr5o4jlslrpfuvknzu.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825171/teslo-shop/goey5dgysqevsr3rfslh.jpg'
      ],
      inStock: 16,
      price: 40,
      sizes: ['XS', 'S', 'L', 'XL', 'XXL'],
      slug: 'women_t_logo_long_sleeve_scoop_neck_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Women's T Logo Long Sleeve Scoop Neck Tee",
      gender: 'women'
    },
    {
      description:
        "Designed for style and comfort, the Women's Small Wordmark Short Sleeve V-Neck Tee features a tonal 3D silicone-printed wordmark on the left chest. Made of 100% Peruvian cotton.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825193/teslo-shop/j7agmdrhaigqpgtjk5fb.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825205/teslo-shop/xqjcbi3n5ayi0ouvb7sq.jpg'
      ],
      inStock: 18,
      price: 35,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'women_small_wordmark_short_sleeve_v-neck_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Women's Small Wordmark Short Sleeve V-Neck Tee",
      gender: 'women'
    },
    {
      description:
        "Designed for style and comfort, the Women's Large Wordmark Short Sleeve Crew Neck Tee features a tonal 3D silicone-printed wordmark across the chest. Made of 100% Peruvian pima cotton.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825233/teslo-shop/rf4zc5d5uejwdgigodoy.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825239/teslo-shop/v82bqbjjnl1npxqvvlh8.jpg'
      ],
      inStock: 5,
      price: 35,
      sizes: ['XL', 'XXL'],
      slug: 'women_large_wordmark_short_sleeve_crew_neck_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Women's Large Wordmark Short Sleeve Crew Neck Tee",
      gender: 'women'
    },
    {
      description:
        "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825269/teslo-shop/e3vlcheks0admmd1e4ar.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825282/teslo-shop/aijokupola5cakju11yt.webp'
      ],
      inStock: 16,
      price: 35,
      sizes: ['S', 'M'],
      slug: 'women_plaid_mode_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: "Women's Plaid Mode Tee",
      gender: 'women'
    },
    {
      description:
        "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825306/teslo-shop/minaz7h7pq7obdjrew6n.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825312/teslo-shop/ly5j9xhw23t0thm9fsqg.webp'
      ],
      inStock: 10,
      price: 130,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'women_powerwall_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Women’s Powerwall Tee',
      gender: 'women'
    },
    {
      description:
        "Fully customized and uniquely styled, the Women's Corp Jacket features a silicone-printed 'T' logo on the left chest and prominent Tesla wordmark across the back.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825337/teslo-shop/mjgkrfuv4vby3s7hq9tn.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825344/teslo-shop/qumffx1mjbihe8dntize.jpg'
      ],
      inStock: 3,
      price: 90,
      sizes: ['M', 'L', 'XL', 'XXL'],
      slug: 'women_corp_jacket',
      type: 'shirts',
      tags: ['shirt'],
      title: "Women's Corp Jacket",
      gender: 'women'
    },
    {
      description:
        "Introducing the Tesla Raven Collection. The Women's Raven Joggers have a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The joggers feature a subtle thermoplastic polyurethane Tesla wordmark and T logo and a french terry interior for a cozy look and feel in every season. Pair them with your Raven Slouchy Crew Sweatshirt, Raven Lightweight Zip Up Jacket or other favorite on the go fit. Made from 70% bamboo and 30% cotton.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825375/teslo-shop/w4nijhf5zehkk1t4ltjo.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825382/teslo-shop/g8drrdruakgtwg9q4hot.webp'
      ],
      inStock: 162,
      price: 100,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'women_raven_joggers',
      type: 'shirts',
      tags: ['shirt'],
      title: "Women's Raven Joggers",
      gender: 'women'
    },
    {
      description:
        'Designed for fit, comfort and style, the Kids Cybertruck Graffiti Long Sleeve Tee features a water-based Cybertruck graffiti wordmark across the chest, a Tesla wordmark down the left arm and our signature T logo on the back collar. Made from 50% cotton and 50% polyester.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825411/teslo-shop/h9nizdp4diwsvndrwysq.jpg',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825415/teslo-shop/ofzrvwtmyg17jlps3vbn.webp'
      ],
      inStock: 10,
      price: 30,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_cybertruck_long_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Kids Cybertruck Long Sleeve Tee',
      gender: 'kid'
    },
    {
      description:
        'The Kids Scribble T Logo Tee is made from 100% Peruvian cotton and features a Tesla T sketched logo for every young artist to wear.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825441/teslo-shop/zn3fpmes2ckqjyezjrhe.jpg',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825444/teslo-shop/szs6euflfn0g3ms7suej.jpg'
      ],
      inStock: 0,
      price: 25,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_scribble_t_logo_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Kids Scribble T Logo Tee',
      gender: 'kid'
    },
    {
      description:
        'The Kids Cybertruck Tee features the iconic Cybertruck graffiti wordmark and is made from 100% Peruvian cotton for maximum comfort.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825498/teslo-shop/bvverrtmqgo4yewk5i8u.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825504/teslo-shop/y9kkhpydn8lfpooxv8pt.webp'
      ],
      inStock: 10,
      price: 25,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_cybertruck_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Kids Cybertruck Tee',
      gender: 'kid'
    },
    {
      description:
        "The refreshed Kids Racing Stripe Tee is made from 100% Peruvian cotton, featuring a newly enhanced racing stripe with a brushed Tesla wordmark that's perfect for any speed racer.",
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825533/teslo-shop/pj4o5qrf0xsqhjhncjvz.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825540/teslo-shop/eq9u9bhipmm59c3mu8sb.webp'
      ],
      inStock: 10,
      price: 30,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_racing_stripe_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Kids Racing Stripe Tee',
      gender: 'kid'
    },
    {
      description:
        'Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825568/teslo-shop/rsmxsuwtjoymqvchofnl.jpg',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825573/teslo-shop/ujvxheu3ml6zqtcagwvf.webp'
      ],
      inStock: 10,
      price: 30,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_3d_t_logo_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Kids 3D T Logo Tee',
      gender: 'kid'
    },
    {
      description:
        'The checkered tee is made from long grain, GMO free Peruvian cotton. Peru is the only country in the world where cotton is picked by hand on a large scale. The 4,500-year-old tradition prevents damage to the fiber during the picking process and removes the need to use chemicals to open the cotton plants before harvest. This environmentally friendly process results in cotton that is soft, strong, and lustrous – and the tee will get even softer with every wash.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825601/teslo-shop/tfwa35xynuiztg5cxln1.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825633/teslo-shop/jowxvehzhgrevxrst7qw.webp'
      ],
      inStock: 10,
      price: 30,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_checkered_tee',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Kids Checkered Tee',
      gender: 'kid'
    },
    {
      description:
        'For the future space traveler with discerning taste, a soft, cotton onesie with snap closure bottom. Clear labeling provided in case of contact with a new spacefaring civilization. 100% Cotton. Made in Peru',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825660/teslo-shop/rsey5nuvmqr5z83uzxr0.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825667/teslo-shop/gaz5knvjsel1e4vlb51z.jpg'
      ],
      inStock: 16,
      price: 25,
      sizes: ['XS', 'S'],
      slug: 'made_on_earth_by_humans_onesie',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Made on Earth by Humans Onesie',
      gender: 'kid'
    },
    {
      description:
        'The Kids Scribble T Logo Onesie is made from 100% Peruvian cotton and features a Tesla T sketched logo for every little artist to wear.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825723/teslo-shop/uesyfsnqyusyllsyebrz.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825762/teslo-shop/ihv5ok1dwkteuuk0qru8.webp'
      ],
      inStock: 0,
      price: 30,
      sizes: ['XS', 'S'],
      slug: 'scribble_t_logo_onesie',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Scribble T Logo Onesie',
      gender: 'kid'
    },
    {
      description:
        'Show your commitment to sustainable energy with this cheeky onesie for your young one. Note: Does not prevent emissions. 100% Cotton. Made in Peru.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825793/teslo-shop/vgtuhrrhmrckutrpnit9.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825805/teslo-shop/rrsehau31veq5c1ly9ea.jpg'
      ],
      inStock: 10,
      price: 30,
      sizes: ['XS', 'S'],
      slug: 'zero_emissions_(almost)_onesie',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Zero Emissions (Almost) Onesie',
      gender: 'kid'
    },
    {
      description:
        'Wear your Kids Cyberquad Bomber Jacket during your adventures on Cyberquad for Kids. The bomber jacket features a graffiti-style illustration of our Cyberquad silhouette and wordmark. With three zippered pockets and our signature T logo and Tesla wordmark printed along the sleeves, Kids Cyberquad Bomber Jacket is perfect for wherever the trail takes you. Made from 60% cotton and 40% polyester.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825835/teslo-shop/vfbqxj9yrg9yekrswxtp.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825842/teslo-shop/wqmfdmqphun1ijfzxxs5.webp'
      ],
      inStock: 10,
      price: 65,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_cyberquad_bomber_jacket',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Kids Cyberquad Bomber Jacket',
      gender: 'kid'
    },
    {
      description:
        'Cruise the playground in style with the Kids Corp Jacket. Modeled after the original Tesla Corp Jacket, the Kids Corp Jacket features the same understated style and high-quality materials but at a pint-sized scale.',
      images: [
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825868/teslo-shop/jltg7pjafdbj0nffizek.webp',
        'https://res.cloudinary.com/dlkhgqybk/image/upload/v1678825875/teslo-shop/hodxjs5rkozgit45ioqv.webp'
      ],
      inStock: 10,
      price: 30,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_corp_jacket',
      type: 'shirts',
      tags: ['shirt'],
      title: 'Kids Corp Jacket',
      gender: 'kid'
    }
  ]
};

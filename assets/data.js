/* Khalifa Trade & Impex — central data layer.
   Add products by appending to ROWS; add categories to CATS + ORDER + IMG.
   Every page reads from this one file. */
(function(){
  var D = {
 "REL": {
  "own": "Own Manufacturing",
  "epp": "Authorised Channel Partner",
  "corsa": "Authorised Channel Partner",
  "teraflow": "Authorised Channel Partner",
  "src": "Sourced & Supplied"
 },
 "ORDER": [
  "hdpe-laminated-tarpaulin",
  "agro-shade-net",
  "composite-frp-gfrp",
  "ptmt-bath-fittings",
  "smc-electrical-infrastructure",
  "plastic-industrial-valves",
  "hdpe-pipes-fittings",
  "fishing-industrial-nets",
  "horticulture-agro-solutions",
  "other-industrial-products"
 ],
 "IMG": {
  "hdpe-laminated-tarpaulin": [
   "badshah-tarpaulin-range.jpg",
   1672,
   941
  ],
  "agro-shade-net": [
   "skyguard-shade-net.jpg",
   1368,
   1149
  ],
  "composite-frp-gfrp": [
   "composite-gfrp-range.jpg",
   1536,
   1024
  ],
  "ptmt-bath-fittings": [
   "ptmt-bath-fittings-range.jpg",
   1536,
   1024
  ],
  "smc-electrical-infrastructure": [
   "smc-electrical-range.jpg",
   1536,
   1024
  ],
  "plastic-industrial-valves": [
   "plastic-valves-range.jpg",
   1536,
   864
  ],
  "hdpe-pipes-fittings": [
   "hdpe-dwc-range.jpg",
   1536,
   864
  ],
  "fishing-industrial-nets": [
   "fishing-industrial-nets-range.jpg",
   1536,
   1024
  ],
  "horticulture-agro-solutions": [
   "horticulture-agro-range.jpg",
   1536,
   864
  ],
  "other-industrial-products": [
   "other-industrial-plastic-range.jpg",
   1672,
   941
  ]
 },
 "CATS": [
  {
   "slug": "composite-frp-gfrp",
   "seoTitle": "FRP & GFRP Composite Products in Ahmedabad | EPP Partner",
   "seoDesc": "GFRP rebars, FRP roof sheets, manhole covers, light poles and SMC panel tanks. Authorised Channel Partner of EPP Composites for Ahmedabad district.",
   "name": "Composite / FRP / GFRP Products",
   "short": "Selected FRP, GFRP and SMC composite solutions.",
   "brand": "EPP Composites Pvt. Ltd.",
   "rel": "epp",
   "intro": "Khalifa Trade & Impex is an Authorised Channel Partner of EPP Composites Pvt. Ltd. for Ahmedabad District & Surrounding Areas, offering selected FRP, GFRP and SMC composite solutions for construction, infrastructure, electrical and industrial applications. We do not represent the entire range — only the products below are part of our current offering.",
   "apps": [
    "Construction & Infrastructure",
    "Water Management",
    "Electrical Infrastructure",
    "Industrial"
   ],
   "subs": [
    [
     "gfrp-rebars-bands",
     "GFRP Rebars & Bands",
     "We offer GFRP reinforcement solutions including GFRP rebars and construction bands. Rebars are available in sizes from 4 mm to 22 mm, with coil and cut-length options. Cut-to-length supply can be arranged according to project requirements. GFRP bands can also be supplied in customised specifications. Suitable for construction and reinforcement applications requiring lightweight composite solutions."
    ],
    [
     "frp-roof-sheets",
     "FRP Roof Sheets",
     "FRP Roof Sheets provide a practical composite roofing solution for industrial, commercial and infrastructure applications. Lightweight construction makes them easier to handle and install. Suitable for applications requiring durable roofing with resistance to demanding environmental conditions. Available in different specifications and customised requirements as applicable. Exact sizes, profiles and technical specifications are confirmed against the principal's verified product information before quotation."
    ],
    [
     "frp-manhole-covers",
     "FRP Manhole Covers",
     "FRP Manhole Covers provide a lightweight composite alternative for selected infrastructure and utility applications. Designed for practical handling, durability and corrosion-resistant performance. Suitable for drainage, utility and infrastructure requirements where FRP composite covers are appropriate. Different sizes and specifications can be supplied according to project requirements. Technical and load specifications are confirmed from the principal's official product information before quotation."
    ],
    [
     "frp-electric-light-poles",
     "FRP Electric Light Poles",
     "We offer FRP Electric Light Poles with customised design possibilities. Along with functional lighting requirements, designer and heritage-inspired pole styles can be developed for premium spaces. Suitable for residential societies, farmhouses, landscaped areas, private projects and selected public spaces. Customised designs, dimensions and finishes can be discussed according to the project requirement. The objective is to combine lighting infrastructure with a distinctive architectural appearance."
    ],
    [
     "smc-panel-tanks",
     "SMC Panel Tanks",
     "SMC Panel Tanks are suitable for large-capacity water and storage requirements. We can arrange customised panel-tank solutions for large installations, with capacities starting from approximately 50,000 litres and extending to several lakh litres, subject to design and project requirements. SMC composite construction offers corrosion-resistant and chemical-resistant characteristics for suitable applications. Panelised construction allows practical customisation according to site and capacity requirements. Exact capacity, dimensions and technical specifications are confirmed from the principal's verified specifications."
    ],
    [
     "smc-electrical-boxes",
     "SMC Electrical Boxes",
     "Our SMC Electrical Box range includes SMC Junction Boxes, SMC Distribution Boxes and SMC Meter Boxes. These composite electrical enclosures are suitable for electrical distribution, metering and infrastructure applications. Different configurations and specifications can be supplied according to project requirements. Product specifications are confirmed from the principal's official information wherever technical details are required."
    ]
   ]
  },
  {
   "slug": "ptmt-bath-fittings",
   "seoTitle": "CORSA PTMT Bath Fittings in Ahmedabad | Authorised Partner",
   "seoDesc": "CORSA PTMT taps, bib cocks, angle cocks, faucets, showers and bathroom accessories. Authorised Channel Partner for Ahmedabad, Gujarat.",
   "name": "PTMT Bath Fittings",
   "short": "PTMT taps, cocks, faucets, showers and bathroom accessories.",
   "brand": "CORSA PTMT Bath Fittings",
   "rel": "corsa",
   "intro": "Explore CORSA's range of PTMT taps, cocks, bathroom fittings, showers, accessories and allied products, supplied by Khalifa Trade & Impex as an Authorised Channel Partner for Ahmedabad. The range covers multiple designs, finishes and product configurations for residential, commercial and project requirements. Product models and specifications are as per the CORSA catalogue, available to download below.",
   "catalogue": "corsa-ptmt-catalogue.pdf",
   "catalogueFile": "CORSA-PTMT-Bath-Fittings-Catalogue.pdf",
   "catalogueBlurb": "Full model codes, designs, finishes and configurations. Download the PDF for the complete listing.",
   "catalogueCta": "Download CORSA Catalogue",
   "catalogueLabel": "CORSA PTMT catalogue",
   "apps": [
    "Plumbing",
    "Commercial & Project Supply",
    "Water Management"
   ],
   "subs": [
    [
     "ptmt-taps",
     "PTMT Taps",
     "The tap range spans ten design series — Safari Metallic, Safari Woody, Safari, Skoda, Graphite, Edge, Fusion, Fusion Mini, Prime and Cube. Each series carries matching bib cocks, long-body taps, sink cocks, swan necks and stop cocks in a consistent design treatment. Quarter-turn disc options are listed in 15 mm, 17 mm and 20 mm, with full-turn alternatives in selected ranges."
    ],
    [
     "basin-taps",
     "Basin Taps",
     "Quarter-turn disc basin models are catalogued across the design series in 15 mm, 17 mm and 20 mm disc sizes. Selected series list colour finishes in white, ivory, yellow and black alongside the standard finish. The Cube series additionally lists 45° models."
    ],
    [
     "pillar-taps",
     "Pillar Taps",
     "Long-body pillar models are listed within each design series for basin and wall-mounted positions. Swan-neck options are catalogued alongside them where a taller reach is required. Model codes differ by series — the catalogue lists the applicable reference for each."
    ],
    [
     "bib-cocks",
     "Bib Cocks",
     "Bib cocks appear in every design series, including the plain bib cock, the bib cock with nozzle and long-body variants. Colour finishes in white, ivory, yellow and black are listed in selected series. Sizes and model codes follow the series reference in the catalogue."
    ],
    [
     "angle-cocks",
     "Angle Cocks",
     "Angle cocks are catalogued in each design series for connecting fixtures to the supply line. Concealed stop cocks are listed alongside them in 15 mm and 20 mm, with exposed full-turn and male-thread stop cock options in several series."
    ],
    [
     "bathroom-faucets",
     "Bathroom Faucets",
     "The health faucet range lists the Cocktail, Dusk and Jupiter models. White and black options are catalogued. Model codes and finishes follow the PHF series listing."
    ],
    [
     "kitchen-faucets",
     "Kitchen Faucets",
     "Sink cocks and swan-neck models are listed in every design series for kitchen and utility positions. The accessories section additionally lists a kitchen soap dispenser supplied with a dish sponge."
    ],
    [
     "showers",
     "Showers",
     "The shower range covers overhead PTMT showers in the POS series along with the Nyle and Aura models. White, black and blue options are catalogued, and selected models are listed with silicon nozzles. A bell shower with a 9-inch arm is also included."
    ],
    [
     "bathroom-accessories",
     "Bathroom Accessories",
     "Accessories catalogued include shower gratings and soap dispensers, among them the Crystal model and a kitchen soap dispenser. Standard packing for selected accessory lines is five pieces."
    ],
    [
     "allied-bathroom-products",
     "Allied Bathroom Products",
     "Allied items include flushing cisterns and the TSC-11 Smart toilet seat cover. Connector and waste fittings are listed in 20 mm and 25 mm. Unbreakable construction is noted against selected allied items."
    ],
    [
     "other-ptmt",
     "Other PTMT Products",
     "Remaining lines sit within the catalogue's accessories and allied sections, including the WP-105A grey item. Enquire with the model code from the catalogue for availability."
    ]
   ]
  },
  {
   "slug": "hdpe-pipes-fittings",
   "seoTitle": "TERAFLOW HDPE & DWC Pipes in Ahmedabad | Authorised Partner",
   "seoDesc": "TERAFLOW HDPE pipes, fittings, couplers, elbows, tees and DWC pipes. Authorised Channel Partner for Ahmedabad, supplying bulk orders and tenders.",
   "name": "HDPE / DWC Pipes & Fittings",
   "short": "HDPE pipes and fittings with DWC pipes for project supply.",
   "brand": "Teraflo",
   "rel": "teraflow",
   "catalogue": "teraflo-hdpe-pipes-catalogue.pdf",
   "catalogueFile": "Teraflo-HDPE-Pipes-and-Fittings-Catalogue.pdf",
   "catalogueBlurb": "Full product listing, sizes and configurations. Download the PDF for the complete range.",
   "catalogueCta": "Download TERAFLOW Catalogue",
   "catalogueLabel": "Teraflo catalogue",
   "intro": "Khalifa Trade & Impex is an Authorised Channel Partner of Teraflo HDPE Pipes & Fittings for Ahmedabad District. We supply HDPE Pipes, Fittings and DWC Pipes for bulk orders, government tenders and large infrastructure projects. Project-specific support can include site visits, pipe selection, requirement planning and coordinated supply based on project needs.",
   "apps": [
    "Water Management",
    "Agriculture",
    "Industrial",
    "Construction & Infrastructure",
    "Commercial & Project Supply"
   ],
   "subs": [
    [
     "hdpe-pipes",
     "HDPE Pipes",
     "HDPE Pipes supplied for water supply, irrigation, infrastructure and other project requirements. Available for bulk quantities and project-based supply, with pipe selection and specifications coordinated according to the application."
    ],
    [
     "hdpe-fittings",
     "HDPE Fittings",
     "HDPE Fittings supplied to support complete piping systems and project requirements. Suitable fittings can be arranged according to pipe size, configuration and application, with bulk and project-wise supply support."
    ],
    [
     "couplers",
     "Couplers",
     "HDPE Couplers for connecting compatible HDPE pipe sections in piping installations. Sizes and configurations can be arranged according to project requirements, with bulk supply available for larger works."
    ],
    [
     "elbows",
     "Elbows",
     "HDPE Elbows for directional changes within HDPE piping systems. Suitable sizes and configurations can be arranged according to the piping layout and project requirements, including bulk quantities."
    ],
    [
     "tees",
     "Tees",
     "HDPE Tees for branching and connecting HDPE piping lines. Supply can be arranged according to required sizes and project configurations, supporting bulk and infrastructure requirements."
    ],
    [
     "reducers",
     "Reducers",
     "HDPE Reducers for connecting HDPE pipes or fittings of different sizes within a piping system. Requirements can be coordinated according to project specifications and application needs."
    ],
    [
     "end-caps",
     "End Caps",
     "HDPE End Caps for closing and terminating HDPE pipe lines. Available for project-based requirements in suitable sizes and configurations, including bulk supply for infrastructure works."
    ],
    [
     "other-hdpe-fittings",
     "Other HDPE Fittings",
     "Additional HDPE fittings can be arranged according to specific piping and project requirements. We support customised sourcing, bulk quantities and coordinated supply for larger industrial, infrastructure and utility projects."
    ],
    [
     "dwc-pipes",
     "DWC Pipes",
     "DWC Pipes supplied for underground cable protection, drainage and infrastructure applications. Suitable solutions can be arranged according to project requirements, with support for site assessment, quantity planning and bulk project supply."
    ]
   ]
  },
  {
   "slug": "hdpe-laminated-tarpaulin",
   "seoTitle": "HDPE Laminated Tarpaulin Manufacturer in Ahmedabad | BADSHAH",
   "seoDesc": "BADSHAH HDPE laminated tarpaulin manufactured by Khalifa Trade & Impex, Ahmedabad. Heavy-duty, agricultural and industrial tarpaulin, 100-350 GSM, custom sizes.",
   "name": "HDPE Laminated Tarpaulin",
   "short": "Our own manufacturing — BADSHAH TARPAULIN.",
   "brand": "BADSHAH TARPAULIN",
   "rel": "own",
   "intro": "Khalifa Trade & Impex is an Ahmedabad-based manufacturer of HDPE Laminated Tarpaulin, with more than 10 years of manufacturing experience. Our own brand, BADSHAH TARPAULIN, is manufactured with a focus on consistent quality, strength and dependable performance.",
   "apps": [
    "Agriculture",
    "Industrial",
    "Commercial & Project Supply",
    "Transportation & Covering"
   ],
   "subs": [
    [
     "heavy-duty-tarpaulin-transportation",
     "Heavy Duty Tarpaulin for Transportation",
     "Heavy-duty HDPE laminated tarpaulin designed for reliable protection of goods during transportation. Built with strong and durable construction to help protect cargo from rain, wind and changing weather conditions. Available in different GSM options according to the required application. Standard sizes are available, with customised sizes that can be manufactured to suit different vehicle and cargo dimensions. Suitable for trucks, trailers and other transportation covering requirements."
    ],
    [
     "agricultural-tarpaulin",
     "Agricultural Tarpaulin",
     "HDPE laminated tarpaulin designed for a range of agricultural protection and covering requirements. Our 110 GSM natural tarpaulin is widely suitable for applications involving crops such as soybean, chickpea and bajra, including bulk quantity requirements. We also manufacture 300 GSM black tarpaulin suitable for pond-liner and related agricultural applications. Standard sizes are available, with customised sizes possible as per requirement. Bulk orders can be supported with competitive pricing based on quantity and specifications."
    ],
    [
     "industrial-tarpaulin",
     "Industrial Tarpaulin",
     "Heavy-duty HDPE laminated tarpaulin manufactured for demanding industrial covering and protection requirements. We manufacture industrial tarpaulin in higher GSM specifications, including 300+ GSM and up to 350 GSM. The heavier construction is suitable for applications where greater strength and durable covering performance are required. Standard as well as customised sizes can be manufactured according to customer requirements. Suitable for industrial storage, material covering and other heavy-duty applications."
    ]
   ]
  },
  {
   "slug": "agro-shade-net",
   "seoTitle": "SKYGUARD Agro Shade Net Manufacturer in Ahmedabad",
   "seoDesc": "SKYGUARD agro shade net manufactured by Khalifa Trade & Impex, Ahmedabad. 9 and 12 gauge, 75% and 90% shade, for agriculture, nursery and event flooring.",
   "name": "Agro Shade Net",
   "short": "Our own manufacturing — SKYGUARD™ HDPE agro shade net.",
   "brand": "SKYGUARD™",
   "rel": "own",
   "intro": "Khalifa Trade & Impex is an Ahmedabad-based manufacturer of HDPE Agro Shade Net, with around 5 years of in-house manufacturing experience. Our own brand, SKYGUARD™ AGRO SHADE NET, is manufactured using HDPE material with a focus on consistent quality, strength and reliable performance.",
   "apps": [
    "Agriculture",
    "Horticulture",
    "Nursery",
    "Events & Flooring"
   ],
   "subs": [
    [
     "agriculture-shade-net",
     "Agricultural Applications",
     "SKYGUARD™ Agro Shade Net is suitable for agricultural fields, farmhouses, nurseries and general shade-protection requirements. Available in different shade levels and gauge options according to application needs. Suitable for creating practical shaded areas for crops, plants and agricultural spaces. Standard and customised sizes can be supplied as required."
    ],
    [
     "flooring-applications",
     "Flooring Applications",
     "We manufacture specialised 12 Gauge shade net suitable for temporary and event flooring applications. Available in multi-colour designs, including Multicolour Patti and Rainbow Patti patterns. Suitable for exhibitions, corporate events, political events and other large gatherings where net flooring is required. Red 12 Gauge net can also be supplied for event-specific flooring requirements. Customised sizes and requirements can be prepared according to the application."
    ]
   ]
  },
  {
   "slug": "fishing-industrial-nets",
   "seoTitle": "Fishing Nets & Industrial Safety Nets in Ahmedabad",
   "seoDesc": "Fishing nets and industrial safety nets supplied for commercial, construction and site requirements across Ahmedabad and Gujarat. Bulk and B2B supply.",
   "name": "Fishing & Industrial Nets",
   "short": "Fishing nets and industrial safety nets for B2B and bulk supply.",
   "brand": "Multiple sources",
   "rel": "src",
   "intro": "Khalifa Trade & Impex deals in Fishing Nets and Industrial Safety Nets for commercial, industrial and project-based requirements. We support B2B and bulk supply, with suitable netting solutions arranged according to application, size, quantity and customer requirements.",
   "apps": [
    "Fisheries",
    "Industrial",
    "Construction & Infrastructure",
    "Commercial & Project Supply"
   ],
   "subs": [
    [
     "fishing-nets",
     "Fishing Nets",
     "Fishing Nets supplied for commercial and general fishing requirements. Different netting requirements can be arranged according to application, size and quantity. B2B and bulk supply is supported for regular and project-based requirements."
    ],
    [
     "industrial-safety-nets",
     "Industrial Safety Nets",
     "Industrial Safety Nets for construction sites, work areas and other applications where protective netting is required. Suitable sizes and configurations can be arranged according to site requirements, with B2B and bulk supply available."
    ]
   ]
  },
  {
   "slug": "horticulture-agro-solutions",
   "seoTitle": "Grow Bags, Wall Plant Bags & Mulching Film | Ahmedabad",
   "seoDesc": "Grow bags, wall plant bags and agro mulching films for nurseries, farming and horticulture. B2B and bulk supply from Khalifa Trade & Impex, Ahmedabad.",
   "name": "Horticulture & Agro Solutions",
   "short": "Grow bags, wall plant bags and agro mulching films.",
   "brand": "Multiple sources",
   "rel": "src",
   "intro": "Khalifa Trade & Impex deals in horticulture and agro solutions including Grow Bags, Wall Plant Bags and Agro Mulching Films. We support B2B and bulk supply for nurseries, farming, gardening and agricultural requirements, with products arranged according to customer and project needs.",
   "apps": [
    "Horticulture",
    "Nursery",
    "Agriculture",
    "Commercial & Project Supply"
   ],
   "subs": [
    [
     "grow-bags",
     "Grow Bags",
     "Grow Bags for horticulture, nursery and plant-growing applications. Suitable solutions can be arranged for different growing requirements, with B2B and bulk supply available according to customer needs."
    ],
    [
     "wall-plant-bags",
     "Wall Plant Bags",
     "Wall Plant Bags for vertical gardening, space-efficient planting and decorative horticulture applications. Suitable quantities can be supplied for individual, commercial and bulk requirements."
    ],
    [
     "agro-mulching-films",
     "Agro Mulching Films",
     "Agro Mulching Films used in agricultural and horticultural applications to support efficient crop-growing practices. B2B and bulk supply can be arranged according to crop, application and customer requirements."
    ]
   ]
  },
  {
   "slug": "plastic-industrial-valves",
   "seoTitle": "Plastic Industrial Valves Supplier in Ahmedabad",
   "seoDesc": "True union ball, butterfly, foot, diaphragm and gate valves in plastic. Supplied for industrial, irrigation and water-management systems from Ahmedabad.",
   "name": "Plastic Industrial Valves",
   "short": "Ball, butterfly, foot, diaphragm and gate valves in plastic.",
   "brand": "Multiple sources",
   "rel": "src",
   "intro": "Plastic Industrial Valves for industrial water management, irrigation and flow-control applications. Our range includes True Union Ball Valves, Butterfly Valves, Foot Valves, Diaphragm Valves and Gate Valves. Customised valve solutions can be arranged as per required dimensions, specifications and application needs, including bulk and private-label requirements under the customer's brand.",
   "apps": [
    "Industrial",
    "Water Management",
    "Agriculture",
    "Commercial & Project Supply"
   ],
   "subs": [
    [
     "industrial-valves",
     "Industrial Valves",
     "Plastic industrial valves for reliable flow control across industrial, water-management and irrigation applications. Options include True Union Ball Valves, Butterfly Valves, Foot Valves, Diaphragm Valves and Gate Valves. Customised dimensions and specifications can be arranged for project and bulk requirements."
    ],
    [
     "flow-control-valves",
     "Flow Control Valves",
     "Flow-control valve solutions designed around specific system requirements. Suitable valve configurations can be arranged according to required dimensions, connections and application needs. Bulk and customised supply options are available for industrial projects."
    ],
    [
     "application-valves",
     "Application-specific Valves",
     "Valve solutions arranged for specific industrial, irrigation and water-management applications. Requirements such as dimensions, configuration and application conditions can be considered for customised supply. Private-label requirements can also be arranged."
    ],
    [
     "other-plastic-valves",
     "Other Plastic Valves",
     "A range of additional plastic valve solutions can be sourced and supplied according to specific customer requirements. Customised dimensions, configurations and quantities can be arranged for industrial and project applications. Private-label supply can also be supported."
    ],
    [
     "end-products",
     "End Products",
     "Complete finished valve requirements can be arranged according to customer-specific dimensions, specifications and application needs. Suitable for project, institutional and bulk requirements. Customised and private-label supply can be arranged under the customer's brand."
    ]
   ]
  },
  {
   "slug": "smc-electrical-infrastructure",
   "seoTitle": "SMC Junction, Distribution & Meter Boxes | Ahmedabad",
   "seoDesc": "SMC electrical enclosures supplied for distribution, metering and infrastructure projects in Ahmedabad. Bulk, customised and private-label supply.",
   "name": "SMC Electrical & Infrastructure Products",
   "short": "SMC junction, distribution and meter boxes, with private-label supply.",
   "brand": "Multiple sources",
   "rel": "src",
   "intro": "SMC Junction Boxes, Distribution Boxes, Meter Boxes and other SMC products supplied for electrical, infrastructure and project requirements. We support bulk quantities, customised specifications and private-label requirements, including products supplied under the customer's own brand for institutional, government, corporate and electrical projects.",
   "apps": [
    "Electrical Infrastructure",
    "Construction & Infrastructure",
    "Industrial",
    "Commercial & Project Supply"
   ],
   "subs": [
    [
     "smc-junction-boxes",
     "SMC Junction Boxes",
     "SMC Junction Boxes supplied for electrical distribution, protection and infrastructure applications. Suitable for project-based and bulk requirements, with customised configurations available as required. Customer-specific and private-label supply can also be arranged."
    ],
    [
     "smc-distribution-boxes",
     "SMC Distribution Boxes",
     "SMC Distribution Boxes for electrical distribution and infrastructure installations. Available for bulk project requirements with configurations and specifications tailored to customer needs. Private-label supply under the customer's own brand can also be arranged."
    ],
    [
     "smc-meter-boxes",
     "SMC Meter Boxes",
     "SMC Meter Boxes supplied for electrical metering and related infrastructure requirements. Suitable for institutional, utility, corporate and project applications, with customised requirements supported. Bulk and private-label supply can be arranged as required."
    ],
    [
     "smc-enclosures",
     "Other SMC Enclosures",
     "Other SMC products and enclosures can be sourced and supplied for specific electrical and infrastructure requirements. This can include project-specific SMC products such as panel-based solutions and other customised requirements. Bulk quantities and private-label supply under the customer's own brand can be arranged."
    ]
   ]
  },
  {
   "slug": "other-industrial-products",
   "seoTitle": "Customised Industrial Plastic Products | Ahmedabad",
   "seoDesc": "Customised and project-based plastic products arranged for existing customers, from development through manufacturing partners to final supply. Ahmedabad.",
   "name": "Other Industrial Plastic Products",
   "short": "Industrial plastic products arranged and supplied on an order-to-order basis as per customer requirements.",
   "brand": "Multiple sources",
   "rel": "src",
   "intro": "Customised and project-based plastic solutions for our existing customers. For customers who regularly purchase our main products, we can also support customised plastic product requirements based on their specific demand, application or project.",
   "apps": [
    "Industrial",
    "Commercial & Project Supply"
   ],
   "statement": true,
   "statementHeading": "Customised & Project-Based Plastic Solutions",
   "statementBody": [
    "If a customer has a customised requirement or an ongoing project, we can coordinate and arrange the required product according to their specifications and instructions.",
    "Depending on the requirement, we can arrange product development, manufacturing through suitable manufacturing partners, customisation and final supply as per the customer's specified application, dimensions, design and other requirements.",
    "This service is intended for existing customers looking for specific, customised or project-based plastic products that are not part of our standard product range."
   ],
   "subs": []
  }
 ],
 "ROWS": [
  [
   "composite-frp-gfrp",
   "gfrp-rebars-bands",
   "GFRP Rebars & Bands",
   [
    "gfrp",
    "rebar",
    "band",
    "reinforcement",
    "composite",
    "construction"
   ]
  ],
  [
   "composite-frp-gfrp",
   "frp-roof-sheets",
   "FRP Roof Sheets",
   [
    "frp",
    "roof sheet",
    "roofing",
    "composite",
    "industrial"
   ]
  ],
  [
   "composite-frp-gfrp",
   "frp-manhole-covers",
   "FRP Manhole Covers",
   [
    "frp",
    "manhole cover",
    "drainage",
    "utility",
    "infrastructure",
    "composite"
   ]
  ],
  [
   "composite-frp-gfrp",
   "frp-electric-light-poles",
   "FRP Electric Light Poles",
   [
    "frp",
    "light pole",
    "lighting",
    "designer",
    "heritage",
    "composite"
   ]
  ],
  [
   "composite-frp-gfrp",
   "smc-panel-tanks",
   "SMC Panel Tanks",
   [
    "smc",
    "panel tank",
    "water storage",
    "composite"
   ]
  ],
  [
   "composite-frp-gfrp",
   "smc-electrical-boxes",
   "SMC Electrical Boxes",
   [
    "smc",
    "junction box",
    "distribution box",
    "meter box",
    "electrical",
    "composite"
   ]
  ],
  [
   "ptmt-bath-fittings",
   "basin-taps",
   "Basin Tap",
   [
    "ptmt",
    "basin",
    "tap"
   ]
  ],
  [
   "ptmt-bath-fittings",
   "pillar-taps",
   "Pillar Tap",
   [
    "ptmt",
    "pillar",
    "tap"
   ]
  ],
  [
   "ptmt-bath-fittings",
   "ptmt-taps",
   "PTMT Tap",
   [
    "ptmt",
    "tap"
   ]
  ],
  [
   "ptmt-bath-fittings",
   "bib-cocks",
   "Bib Cock",
   [
    "ptmt",
    "bib cock"
   ]
  ],
  [
   "ptmt-bath-fittings",
   "angle-cocks",
   "Angle Cock",
   [
    "ptmt",
    "angle cock"
   ]
  ],
  [
   "ptmt-bath-fittings",
   "bathroom-faucets",
   "Bathroom Faucet",
   [
    "ptmt",
    "faucet",
    "bathroom"
   ]
  ],
  [
   "ptmt-bath-fittings",
   "kitchen-faucets",
   "Kitchen Faucet",
   [
    "ptmt",
    "faucet",
    "kitchen"
   ]
  ],
  [
   "ptmt-bath-fittings",
   "showers",
   "Shower",
   [
    "ptmt",
    "shower",
    "bathroom"
   ]
  ],
  [
   "ptmt-bath-fittings",
   "bathroom-accessories",
   "Bathroom Accessory",
   [
    "ptmt",
    "accessory",
    "bathroom"
   ]
  ],
  [
   "hdpe-pipes-fittings",
   "hdpe-pipes",
   "HDPE Pipe",
   [
    "hdpe",
    "pipe",
    "plumbing",
    "teraflo",
    "water supply",
    "irrigation"
   ]
  ],
  [
   "hdpe-pipes-fittings",
   "hdpe-fittings",
   "HDPE Fitting",
   [
    "hdpe",
    "fitting",
    "teraflo",
    "piping system"
   ]
  ],
  [
   "hdpe-pipes-fittings",
   "other-hdpe-fittings",
   "Other HDPE Fitting",
   [
    "hdpe",
    "fitting",
    "teraflo",
    "custom",
    "project"
   ]
  ],
  [
   "hdpe-pipes-fittings",
   "couplers",
   "HDPE Coupler",
   [
    "hdpe",
    "coupler",
    "fitting"
   ]
  ],
  [
   "hdpe-pipes-fittings",
   "elbows",
   "HDPE Elbow",
   [
    "hdpe",
    "elbow",
    "fitting"
   ]
  ],
  [
   "hdpe-pipes-fittings",
   "tees",
   "HDPE Tee",
   [
    "hdpe",
    "tee",
    "fitting"
   ]
  ],
  [
   "hdpe-pipes-fittings",
   "reducers",
   "HDPE Reducer",
   [
    "hdpe",
    "reducer",
    "fitting"
   ]
  ],
  [
   "hdpe-pipes-fittings",
   "end-caps",
   "HDPE End Cap",
   [
    "hdpe",
    "end cap",
    "fitting"
   ]
  ],
  [
   "hdpe-pipes-fittings",
   "dwc-pipes",
   "DWC Pipe",
   [
    "dwc",
    "pipe",
    "drainage"
   ],
   "src"
  ],

  [
   "hdpe-laminated-tarpaulin",
   "heavy-duty-tarpaulin-transportation",
   "Heavy Duty Tarpaulin for Transportation",
   [
    "tarpaulin",
    "hdpe",
    "badshah",
    "heavy duty",
    "transportation",
    "truck",
    "trailer",
    "cargo"
   ]
  ],
  [
   "hdpe-laminated-tarpaulin",
   "agricultural-tarpaulin",
   "Agricultural Tarpaulin",
   [
    "tarpaulin",
    "hdpe",
    "badshah",
    "agriculture",
    "natural",
    "pond liner"
   ]
  ],
  [
   "hdpe-laminated-tarpaulin",
   "industrial-tarpaulin",
   "Industrial Tarpaulin",
   [
    "tarpaulin",
    "hdpe",
    "badshah",
    "industrial",
    "heavy duty",
    "covering"
   ]
  ],
  [
   "agro-shade-net",
   "agriculture-shade-net",
   "Agro Shade Net — Agricultural Applications",
   [
    "shade net",
    "agro",
    "agriculture",
    "skyguard",
    "hdpe",
    "farmhouse",
    "nursery"
   ]
  ],
  [
   "agro-shade-net",
   "flooring-applications",
   "Agro Shade Net — Flooring Applications",
   [
    "shade net",
    "agro",
    "skyguard",
    "flooring",
    "event",
    "exhibition",
    "multicolour patti",
    "rainbow patti"
   ]
  ],
  [
   "fishing-industrial-nets",
   "fishing-nets",
   "Fishing Net",
   [
    "fishing",
    "net",
    "fisheries"
   ]
  ],
  [
   "fishing-industrial-nets",
   "industrial-safety-nets",
   "Industrial Safety Net",
   [
    "industrial",
    "safety",
    "net"
   ]
  ],
  [
   "horticulture-agro-solutions",
   "grow-bags",
   "Grow Bag",
   [
    "grow bag",
    "horticulture"
   ]
  ],
  [
   "horticulture-agro-solutions",
   "wall-plant-bags",
   "Wall Plant Bag",
   [
    "wall plant bag",
    "horticulture"
   ]
  ],
  [
   "horticulture-agro-solutions",
   "agro-mulching-films",
   "Agro Mulching Film",
   [
    "mulching film",
    "agriculture"
   ]
  ],
  [
   "plastic-industrial-valves",
   "industrial-valves",
   "Plastic Industrial Valve",
   [
    "valve",
    "industrial",
    "plastic"
   ]
  ],
  [
   "plastic-industrial-valves",
   "flow-control-valves",
   "Flow Control Valve",
   [
    "valve",
    "flow control"
   ]
  ],
  [
   "plastic-industrial-valves",
   "application-valves",
   "Application-specific Valve",
   [
    "valve",
    "application",
    "irrigation",
    "water management"
   ]
  ],
  [
   "plastic-industrial-valves",
   "other-plastic-valves",
   "Other Plastic Valve",
   [
    "valve",
    "plastic",
    "private label"
   ]
  ],
  [
   "plastic-industrial-valves",
   "end-products",
   "Finished Valve End Product",
   [
    "valve",
    "end product",
    "finished",
    "private label",
    "bulk"
   ]
  ],
  [
   "smc-electrical-infrastructure",
   "smc-junction-boxes",
   "SMC Junction Box",
   [
    "smc",
    "junction box",
    "electrical"
   ]
  ],
  [
   "smc-electrical-infrastructure",
   "smc-distribution-boxes",
   "SMC Distribution Box",
   [
    "smc",
    "distribution box",
    "electrical"
   ]
  ],
  [
   "smc-electrical-infrastructure",
   "smc-meter-boxes",
   "SMC Meter Box",
   [
    "smc",
    "meter box",
    "electrical"
   ]
  ],
  [
   "smc-electrical-infrastructure",
   "smc-enclosures",
   "SMC Enclosure",
   [
    "smc",
    "enclosure",
    "electrical"
   ]

  ]
 ],
 "PHONE": "+91 98252 84842",
 "PHONE_RAW": "919825284842",
 "EMAIL": "khalifatradeimpex@gmail.com",
 "ADDRESS_OFFICE_LABEL": "Registered Office",
 "ADDRESS_OFFICE": "2344, Nr. Dabgarwad Police Choky, Mansuriwad, Dariyapur, Ahmedabad - 380001",
 "ADDRESS_OFFICE_HTML": "2344, Nr. Dabgarwad Police Choky,<br>Mansuriwad, Dariyapur,<br>Ahmedabad - 380001",
 "ADDRESS_FACTORY_LABEL": "Factory",
 "ADDRESS_FACTORY": "Shade No. 06, Survey No. 261/1, Shahwadi Rd, opp. DEEP RMS Plant, Nr. Anupam Creation, Saijpur-Gopalpur, Ahmedabad, Gujarat 382405",
 "ADDRESS_FACTORY_HTML": "Shade No. 06, Survey No. 261/1, Shahwadi Rd,<br>opp. DEEP RMS Plant, Nr. Anupam Creation,<br>Saijpur-Gopalpur, Ahmedabad, Gujarat 382405",
 "ADDRESS": "Dariyapur, Ahmedabad, Gujarat, India"
};

  var byCat = {};
  D.CATS.forEach(function(c){ byCat[c.slug] = c; });
  D.CATS.sort(function(a,b){ return D.ORDER.indexOf(a.slug) - D.ORDER.indexOf(b.slug); });
  D.byCat = byCat;

  /* Slugs are derived from the product NAME only — never from array position —
     so adding or removing a row can never change another product's URL.
     A duplicate name gets a -2, -3 … suffix in row order. */
  var slugSeen = {};
  D.PRODUCTS = D.ROWS.map(function(r,i){
    var cat = byCat[r[0]];
    var sub = null;
    for (var k=0;k<cat.subs.length;k++){ if (cat.subs[k][0]===r[1]) sub = cat.subs[k]; }
    if (!sub) sub = [r[1], r[1]];
    var relKey = r[4] || cat.rel;
    var base = r[2].toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    slugSeen[base] = (slugSeen[base] || 0) + 1;
    var slug = slugSeen[base] > 1 ? base + '-' + slugSeen[base] : base;
    return {
      id: 'P' + String(i+1).padStart(4,'0'),
      slug: slug,
      name: r[2],
      category: cat.slug,
      categoryName: cat.name,
      subCategory: sub[0],
      subCategoryName: sub[1],
      brand: r[4] === 'src' ? 'Multiple sources' : cat.brand,
      relKey: relKey,
      businessRelationship: D.REL[relKey],
      tags: r[3],
      applications: cat.apps
    };
  });

  var subIndex = {};
  D.CATS.forEach(function(c){ c.subs.forEach(function(s,i){ subIndex[c.slug+'/'+s[0]] = i; }); });
  D.PRODUCTS.sort(function(a,b){
    var d = D.ORDER.indexOf(a.category) - D.ORDER.indexOf(b.category);
    if (d !== 0) return d;
    return (subIndex[a.category+'/'+a.subCategory]||0) - (subIndex[b.category+'/'+b.subCategory]||0);
  });

  /* Categories whose individual product entries are verified (not placeholders).
     Sub-category copy can be verified while product entries are still generic,
     as with PTMT — the catalogue holds the real model codes. */
  D.VERIFIED_PRODUCTS = { 'hdpe-laminated-tarpaulin':1, 'agro-shade-net':1, 'composite-frp-gfrp':1 };
  D.isVerified = function(p){ return !!D.VERIFIED_PRODUCTS[p.category]; };

  D.subDesc = {};
  D.CATS.forEach(function(c){ c.subs.forEach(function(s){ if (s[2]) D.subDesc[c.slug+'/'+s[0]] = s[2]; }); });

  D.blurb = function(p){
    if (p.relKey === 'own') return 'Manufactured by Khalifa Trade & Impex. Options offered against requirement.';
    if (p.relKey === 'src') return 'Sourced and supplied from established manufacturers and distributors.';
    return 'Supplied under our authorised partnership with ' + p.brand + '.';
  };
  D.wa = function(text){ return 'https://wa.me/' + D.PHONE_RAW + '?text=' + encodeURIComponent(text); };

  window.KTI = D;
})();

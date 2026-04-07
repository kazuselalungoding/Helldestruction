export default function Footer() {
  const sosialMediaLinks = [
    {
      id: "Instagram",
      label: "Instagram",
      href: "https://www.instagram.com/helldestruction/",
      icon: "/assets/svg/icon/instagram.svg",
    },
    {
      id: "Facebook",
      label: "Facebook",
      href: "https://www.facebook.com/helldestruction",
      icon: "/assets/svg/icon/facebook.svg",
    },
    {
      id: "X",
      label: "X",
      href: "https://x.com/Helldestruction",
      icon: "/assets/svg/icon/x.svg",
    },
  ];

  const storeLinks = [
    {
      id: "Bandung",
      label: "Bandung",
      href: "https://www.google.com/maps/place/Helldestruction+Bandung/@-6.9038918,107.5731163,17z/data=!3m1!4b1!4m5!3m4!1s0x2e68e7c9a9c8b8f5:0x9c8b8f5c8b8f5c8!8m2!3d-6.9038918!4d107.575305",
    },
    {
      id: "Jakarta",
      label: "Jakarta",
      href: "https://www.google.com/maps/place/Helldestruction+Jakarta/@-6.2087634,106.845599,17z/data=!3m1!4b1!4m5!3m4!1s0x2e69f3e8a9c8b8f5:0x9c8b8f5c8b8f5c8!8m2!3d-6.2087634!4d106.847788",
    },
    {
      id: "Surabaya",
      label: "Surabaya",
      href: "https://www.google.com/maps/place/Helldestruction+Surabaya/@-7.257472,112.752088,17z/data=!3m1!4b1!4m5!3m4!1s0x2e70a8c8a9c8b8f5:0x9c8b8f5c8b8f5c8!8m2!3d-7.257472!4d112.754277",
    },
  ];
  return (
    <footer className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div className="hidden w-full h-96 bg-primary-800 rounded-xl sm:flex flex-col items-center justify-center gap-8">
        <div className="text-center font-bold font-bagos lg:text-6xl md:text-6xl sm:text-6xl text-4xl">
          <h1>MAKE UR SWAGG</h1>
          <h1>WITH US!!!</h1>
        </div>
        <div className="text-center font-bagos font-bold">
          <p className="text">
            THE HELLDESTRUCTION COMMUNITY IS A SPACE TO <br /> EXPLORE NEW
            CREATIONS, SPECIAL RELEASES, <br /> BEHIND THE SCENES MOMENTS, &
            MORE
          </p>
        </div>
      </div>

      <div className="w-full min-h-64 bg-neutral-500 rounded-xl grid grid-cols-1 md:grid-cols-2 p-8 gap-8 font-bagos font-bold">
        <div>
          <div>
            <h1 className="text-xl">HELLDESTRUCTION</h1>
            <div className="flex gap-8 mt-4">
              {sosialMediaLinks.map((link) => (
                <a key={link.id} href={link.href} className="">
                  <img src={link.icon} alt={link.label} className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full text-xl">
          <div className="">
            <h1 className="mb-2">STORE</h1>
            <div>
              {storeLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="block mt-2 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className=" max-w-full">
            <h1 className="mb-2">CONTACT US</h1>
            <a href="tel:0812345678" className="block mb-1 hover:underline">
              0812345678
            </a>
            <a
              href="mailto:helldestruction@gmail.com"
              className="block break-all text-base sm:text-lg md:text-xl hover:underline"
            >
              helldestruction@gmail.com
            </a>
          </div>
        </div>
        <div className="self-end">
          <p>© 2026 Helldestruction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

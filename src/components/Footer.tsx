import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        {/* Brand */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-lime-400">Chukuaride</h1>
          <p className="text-sm mt-2 text-gray-400">
            Drive your dreams. Safe, affordable, reliable car rentals.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {['Home', 'Our Fleet', 'About Us', 'Contact'].map((link, i) => (
              <li key={i}>
                <a
                  href={`/${link.toLowerCase().replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-lime-400" />
              +254 712 345 678
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-lime-400" />
              support@chukuaride.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-lime-400" />
              Nairobi, Kenya
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-400">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-white transition-colors">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Chukuaride. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

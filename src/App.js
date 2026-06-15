import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, Share2, Scissors, Users, Star, Award, Menu, X, Plus, Settings, Bell, LogOut } from 'lucide-react';export default function BlessedFadesWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBarberLoggedIn, setIsBarberLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [shopSettings, setShopSettings] = useState({
    address: '123 Main Street',
    city: 'Your City, ST 12345',
    phone: '(555) 123-4567',
    email: 'hello@blessedfades.com',
    hours: {
      weekday: 'Monday – Saturday: 10:00 AM – 7:00 PM',
      weekend: 'Sunday: 12:00 PM – 5:00 PM'
    }
  });
  
  const [editingSettings, setEditingSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState({...shopSettings});
  
  const [barbers] = useState([
    { id: 1, name: 'Carlos Rodriguez', specialty: 'Precision Fades & Tapers', image: '👨‍🦱', bio: 'Master craftsman with 15+ years of expertise in contemporary cuts and traditional techniques' },
    { id: 2, name: 'Marcus Johnson', specialty: 'Beard Artistry', image: '👨🏾‍🦱', bio: 'Specialist in sculpted beard designs and premium grooming treatments' },
    { id: 3, name: 'David Chen', specialty: 'Modern Styling', image: '👨🏻‍🦱', bio: 'Contemporary cuts with attention to detail and personalized styling consultations' }
  ]);
  
  const [appointments, setAppointments] = useState([
    { id: 1, clientName: 'John Smith', service: 'Premium Fade', date: '2024-12-20', time: '10:00 AM', barber: 'Carlos Rodriguez', notes: 'Preferred client - sharp lines, high fade' },
    { id: 2, clientName: 'Mike Johnson', service: 'Executive Cut & Beard', date: '2024-12-20', time: '11:30 AM', barber: 'Marcus Johnson', notes: 'First consultation' },
    { id: 3, clientName: 'Alex Williams', service: 'Classic Taper', date: '2024-12-21', time: '2:00 PM', barber: 'David Chen', notes: 'Regular - consistent style preference' }
  ]);
  
  const [walkInQueue, setWalkInQueue] = useState([
    { id: 1, name: 'James Brown', service: 'Premium Fade', joinedAt: '2:30 PM', phone: '555-0101' },
    { id: 2, name: 'Sarah Wilson', service: 'Kids Cut', joinedAt: '2:45 PM', phone: '555-0102' }
  ]);
  
  const [newWalkIn, setNewWalkIn] = useState({ name: '', service: '', phone: '' });
  const [showAddWalkIn, setShowAddWalkIn] = useState(false);
  
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    clientName: '',
    service: '',
    date: '',
    time: '',
    barber: '',
    notes: ''
  });

  const services = [
    { name: 'Premium Fade', price: '$45', description: 'Precision fade with expert line work' },
    { name: 'Executive Cut & Beard', price: '$65', description: 'Complete grooming package for the discerning gentleman' },
    { name: 'Classic Taper', price: '$40', description: 'Timeless styling with refined edges' },
    { name: 'Hot Towel Shave', price: '$50', description: 'Luxury grooming experience with premium products' },
    { name: 'Kids Cut', price: '$30', description: 'Professional styling for young clients' },
    { name: 'Beard Design & Shape', price: '$35', description: 'Sculpted beard artistry and maintenance' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setIsBarberLoggedIn(true);
      setCurrentPage('barber-dashboard');
    }
  };

  const handleLogout = () => {
    setIsBarberLoggedIn(false);
    setLoginEmail('');
    setLoginPassword('');
    setCurrentPage('home');
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (newAppointment.clientName && newAppointment.service && newAppointment.date && newAppointment.time && newAppointment.barber) {
      const appointment = { id: appointments.length + 1, ...newAppointment };
      setAppointments([...appointments, appointment]);
      setNewAppointment({ clientName: '', service: '', date: '', time: '', barber: '', notes: '' });
      setShowAddAppointment(false);
    }
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };
  
  const handleAddWalkIn = () => {
    if (newWalkIn.name && newWalkIn.service) {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      const walkIn = { id: walkInQueue.length + 1, ...newWalkIn, joinedAt: time };
      setWalkInQueue([...walkInQueue, walkIn]);
      setNewWalkIn({ name: '', service: '', phone: '' });
      setShowAddWalkIn(false);
    }
  };
  
  const handleCallNext = () => {
    if (walkInQueue.length > 0) {
      setWalkInQueue(walkInQueue.slice(1));
    }
  };
  
  const handleSaveSettings = () => {
    setShopSettings({...tempSettings});
    setEditingSettings(false);
  };
  
  const handleCancelSettings = () => {
    setTempSettings({...shopSettings});
    setEditingSettings(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 tracking-tight italic" style={{fontFamily: 'Georgia, serif', letterSpacing: '-1px'}}>Blessed Fades</span>
            </div>
            
            <div className="hidden md:flex space-x-10">
              {['Home', 'Services', 'Barbers', 'Gallery', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => setCurrentPage(item.toLowerCase())}
                  className={`text-sm font-semibold transition-colors ${
                    currentPage === item.toLowerCase() 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item}
                </button>
              ))}
              {isBarberLoggedIn ? (
                <button onClick={() => setCurrentPage('barber-dashboard')} className="text-sm font-semibold text-gray-700 hover:text-blue-600">Dashboard</button>
              ) : (
                <button onClick={() => setCurrentPage('barber-login')} className="text-sm font-semibold text-gray-700 hover:text-blue-600">Staff Login</button>
              )}
            </div>
            
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-grow">
        {currentPage === 'home' && (
          <div>
            {/* Hero */}
            <div className="relative h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center">
              <div className="absolute inset-0 opacity-10 mix-blend-overlay">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900"></div>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white mb-6 tracking-tighter italic" style={{fontFamily: 'Georgia, serif'}}>Blessed Fades</h1>
                <p className="text-2xl md:text-3xl text-white mb-12 font-light tracking-wide" style={{fontFamily: 'Georgia, serif'}}>Exceptional Grooming. Premium Craftsmanship.</p>
                <button onClick={() => setCurrentPage('contact')} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold transition-all transform hover:scale-105">
                  Schedule Appointment
                </button>
              </div>
            </div>

            {/* Why Us */}
            <div className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-5xl font-bold text-center mb-4 text-gray-900">The Blessed Fades Experience</h2>
                <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">What sets us apart from every other barbershop</p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { icon: Award, title: 'Master Craftsmen', desc: 'Each barber brings 10+ years of specialized expertise' },
                    { icon: Star, title: 'Premium Experience', desc: 'Luxury grooming products and personalized attention' },
                    { icon: Users, title: 'Exclusive Community', desc: 'A space where gentlemen gather and connections form' }
                  ].map((item, i) => (
                    <div key={i} className="bg-gradient-to-br from-gray-50 to-blue-50 p-10 rounded-xl border border-gray-200 hover:border-blue-300 transition-all">
                      <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-12">
                  <div className="text-center">
                    <Clock className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Hours</h3>
                    <p className="text-gray-700">{shopSettings.hours.weekday}</p>
                    <p className="text-gray-700">{shopSettings.hours.weekend}</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-700">{shopSettings.address}</p>
                    <p className="text-gray-700">{shopSettings.city}</p>
                  </div>
                  <div className="text-center">
                    <Phone className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Contact</h3>
                    <p className="text-gray-700">{shopSettings.phone}</p>
                    <p className="text-gray-700">{shopSettings.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'services' && (
          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">Our Services</h1>
              <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">Curated grooming experiences for the distinguished gentleman</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-blue-300 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
                      <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-20 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Walk-In Availability</h2>
                <p className="text-gray-200 mb-8 text-lg">No appointment needed. Join our queue and we'll call you when it's your turn.</p>
                <button onClick={() => setCurrentPage('walkin-queue')} className="bg-white text-blue-600 px-10 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all">
                  Join Queue Now
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'barbers' && (
          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">Meet Our Artisans</h1>
              <p className="text-center text-gray-600 mb-16 text-lg">Specialists in precision and style</p>
              
              <div className="grid md:grid-cols-3 gap-10">
                {barbers.map(barber => (
                  <div key={barber.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all">
                    <div className="h-80 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-9xl">
                      {barber.image}
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{barber.name}</h3>
                      <p className="text-blue-600 font-semibold mb-4">{barber.specialty}</p>
                      <p className="text-gray-700 leading-relaxed">{barber.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'gallery' && (
          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">Our Portfolio</h1>
              <p className="text-center text-gray-600 mb-16 text-lg">Precision in every cut</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white text-6xl hover:scale-105 transition-transform cursor-pointer shadow-lg">
                    ✂️
                  </div>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <p className="text-gray-600 mb-6 text-lg">Follow our latest work</p>
                <button className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg transition-all">
                  <Share2 className="w-6 h-6" />
                  <span>@bless3d_fades</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'walkin-queue' && (
          <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">Live Queue</h1>
              <p className="text-center text-gray-600 mb-12 text-lg">Real-time wait times and queue management</p>
              
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 p-10 mb-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Current Queue</h2>
                  <div className="flex items-center space-x-3 bg-blue-600 text-white px-6 py-3 rounded-lg">
                    <Users className="w-5 h-5" />
                    <span className="font-bold text-lg">{walkInQueue.length} Waiting</span>
                  </div>
                </div>
                
                {walkInQueue.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-xl">No one in queue. Walk in today!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {walkInQueue.map((person, index) => (
                      <div key={person.id} className={`flex items-center justify-between p-6 rounded-xl ${
                        index === 0 
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500' 
                          : 'bg-white border border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-6">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            index === 0 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-bold text-lg text-gray-900">{person.name}</p>
                            <p className="text-sm text-gray-600">{person.service} • Joined {person.joinedAt}</p>
                          </div>
                        </div>
                        {index === 0 && (
                          <div className="flex items-center space-x-2 text-green-600 font-bold">
                            <Bell className="w-5 h-5 animate-pulse" />
                            <span>Next Up</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {!isBarberLoggedIn && (
                  <div className="mt-10 text-center">
                    <button onClick={() => setShowAddWalkIn(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-bold transition-all transform hover:scale-105">
                      Join Queue
                    </button>
                  </div>
                )}
                
                {isBarberLoggedIn && walkInQueue.length > 0 && (
                  <div className="mt-10 text-center">
                    <button onClick={handleCallNext} className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-bold transition-all">
                      Call Next
                    </button>
                  </div>
                )}
              </div>
              
              {showAddWalkIn && (
                <div className="bg-white border border-gray-200 rounded-2xl p-10">
                  <h2 className="text-2xl font-bold mb-8 text-gray-900">Join the Queue</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold mb-3 text-gray-900">Full Name *</label>
                      <input 
                        type="text"
                        value={newWalkIn.name}
                        onChange={(e) => setNewWalkIn({...newWalkIn, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-3 text-gray-900">Service *</label>
                      <select 
                        value={newWalkIn.service}
                        onChange={(e) => setNewWalkIn({...newWalkIn, service: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select service...</option>
                        {services.map((s, i) => (
                          <option key={i} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-3 text-gray-900">Phone (Optional)</label>
                      <input 
                        type="tel"
                        value={newWalkIn.phone}
                        onChange={(e) => setNewWalkIn({...newWalkIn, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="flex space-x-4 pt-4">
                      <button onClick={handleAddWalkIn} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-all">
                        Join Queue
                      </button>
                      <button onClick={() => setShowAddWalkIn(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-lg font-bold transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">Get In Touch</h1>
              <p className="text-center text-gray-600 mb-16 text-lg">Schedule your appointment or reach out with any inquiries</p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-10">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-900">Name</label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-900">Phone</label>
                      <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-900">Email</label>
                    <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-900">Service</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                      <option>Select service...</option>
                      {services.map((service, i) => (
                        <option key={i}>{service.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-900">Preferred Date & Time</label>
                    <input type="datetime-local" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-900">Message</label>
                    <textarea rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"></textarea>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold transition-all transform hover:scale-105">
                    Send Request
                  </button>
                </div>
              </div>

              <div className="mt-16 grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-3 text-gray-900">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <span>Visit Us</span>
                  </h3>
                  <p className="text-gray-700 font-semibold">{shopSettings.address}</p>
                  <p className="text-gray-700">{shopSettings.city}</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-3 text-gray-900">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <span>Contact</span>
                  </h3>
                  <p className="text-gray-700 font-semibold">{shopSettings.phone}</p>
                  <p className="text-gray-700">{shopSettings.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'barber-login' && (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scissors className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Staff Portal</h2>
                <p className="text-gray-600 mt-2 font-light">Professional access only</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">Email</label>
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="admin@blessedfades.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">Password</label>
                  <input 
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
                
                <button onClick={(e) => { e.preventDefault(); handleLogin(e); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-all transform hover:scale-105">
                  Sign In
                </button>
              </div>
              
              <p className="text-center text-gray-600 text-xs mt-8 font-light">
                Demo: Use any credentials to login
              </p>
            </div>
          </div>
        )}

        {currentPage === 'barber-dashboard' && (
          <div className="py-10 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600 mt-2">Manage appointments and operations</p>
                </div>
                <div className="flex space-x-4">
                  <button onClick={() => setCurrentPage('admin-settings')} className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </button>
                  <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-10">
                {[
                  { label: 'Appointments', value: appointments.length, icon: Calendar, color: 'blue' },
                  { label: 'Today', value: 2, icon: Clock, color: 'green' },
                  { label: 'Queue', value: walkInQueue.length, icon: Users, color: 'purple' },
                  { label: 'Barbers', value: barbers.length, icon: Scissors, color: 'orange' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-semibold">{stat.label}</p>
                        <p className="text-4xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-12 h-12 text-${stat.color}-500`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <button onClick={() => setCurrentPage('walkin-queue')} className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-left">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">Walk-In Queue</h3>
                    <Users className="w-8 h-8" />
                  </div>
                  <p className="text-purple-100">{walkInQueue.length} waiting • Manage queue</p>
                </button>
                
                <button onClick={() => setShowAddAppointment(true)} className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-left">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">New Appointment</h3>
                    <Plus className="w-8 h-8" />
                  </div>
                  <p className="text-blue-100">Schedule a new client</p>
                </button>
              </div>

              {showAddAppointment && (
                <div className="bg-white border border-gray-200 rounded-xl p-10 mb-10">
                  <h2 className="text-2xl font-bold mb-8 text-gray-900">New Appointment</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-900">Client Name</label>
                        <input 
                          type="text"
                          value={newAppointment.clientName}
                          onChange={(e) => setNewAppointment({...newAppointment, clientName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-900">Service</label>
                        <select 
                          value={newAppointment.service}
                          onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Select...</option>
                          {services.map((s, i) => (
                            <option key={i} value={s.name}>{s.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-900">Date</label>
                        <input 
                          type="date"
                          value={newAppointment.date}
                          onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-900">Time</label>
                        <input 
                          type="time"
                          value={newAppointment.time}
                          onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2 text-gray-900">Barber</label>
                        <select 
                          value={newAppointment.barber}
                          onChange={(e) => setNewAppointment({...newAppointment, barber: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Select...</option>
                          {barbers.map((b) => (
                            <option key={b.id} value={b.name}>{b.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-900">Notes</label>
                      <textarea 
                        value={newAppointment.notes}
                        onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="flex space-x-4">
                      <button onClick={(e) => { e.preventDefault(); handleAddAppointment(e); }} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all">
                        Save
                      </button>
                      <button onClick={() => setShowAddAppointment(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-8 py-3 rounded-lg font-bold transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-8 py-6 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
                  <h2 className="text-2xl font-bold">Scheduled Appointments</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-900">Client</th>
                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-900">Service</th>
                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-900">Date</th>
                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-900">Time</th>
                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-900">Barber</th>
                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-900">Notes</th>
                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.map(apt => (
                        <tr key={apt.id} className="hover:bg-gray-50">
                          <td className="px-8 py-4 font-semibold text-gray-900">{apt.clientName}</td>
                          <td className="px-8 py-4 text-gray-700">{apt.service}</td>
                          <td className="px-8 py-4 text-gray-700">{apt.date}</td>
                          <td className="px-8 py-4 text-gray-700">{apt.time}</td>
                          <td className="px-8 py-4 text-gray-700">{apt.barber}</td>
                          <td className="px-8 py-4 text-sm text-gray-600">{apt.notes}</td>
                          <td className="px-8 py-4">
                            <button onClick={() => handleDeleteAppointment(apt.id)} className="text-red-600 hover:text-red-800 font-semibold">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'admin-settings' && (
          <div className="py-10 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Shop Settings</h1>
                  <p className="text-gray-600 mt-2">Manage your business information</p>
                </div>
                <button onClick={() => setCurrentPage('barber-dashboard')} className="text-gray-700 hover:text-blue-600 font-semibold">
                  ← Back
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-10">
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-3 text-gray-900">Street Address</label>
                      <input 
                        type="text"
                        value={editingSettings ? tempSettings.address : shopSettings.address}
                        onChange={(e) => setTempSettings({...tempSettings, address: e.target.value})}
                        onFocus={() => setEditingSettings(true)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-3 text-gray-900">City, State ZIP</label>
                      <input 
                        type="text"
                        value={editingSettings ? tempSettings.city : shopSettings.city}
                        onChange={(e) => setTempSettings({...tempSettings, city: e.target.value})}
                        onFocus={() => setEditingSettings(true)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-3 text-gray-900">Phone Number</label>
                      <input 
                        type="tel"
                        value={editingSettings ? tempSettings.phone : shopSettings.phone}
                        onChange={(e) => setTempSettings({...tempSettings, phone: e.target.value})}
                        onFocus={() => setEditingSettings(true)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-3 text-gray-900">Email Address</label>
                      <input 
                        type="email"
                        value={editingSettings ? tempSettings.email : shopSettings.email}
                        onChange={(e) => setTempSettings({...tempSettings, email: e.target.value})}
                        onFocus={() => setEditingSettings(true)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-3 text-gray-900">Weekday Hours</label>
                      <input 
                        type="text"
                        value={editingSettings ? tempSettings.hours.weekday : shopSettings.hours.weekday}
                        onChange={(e) => setTempSettings({...tempSettings, hours: {...tempSettings.hours, weekday: e.target.value}})}
                        onFocus={() => setEditingSettings(true)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-3 text-gray-900">Weekend Hours</label>
                      <input 
                        type="text"
                        value={editingSettings ? tempSettings.hours.weekend : shopSettings.hours.weekend}
                        onChange={(e) => setTempSettings({...tempSettings, hours: {...tempSettings.hours, weekend: e.target.value}})}
                        onFocus={() => setEditingSettings(true)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {editingSettings && (
                    <div className="flex space-x-4 pt-6 border-t border-gray-200">
                      <button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all">
                        Save Changes
                      </button>
                      <button onClick={handleCancelSettings} className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-8 py-3 rounded-lg font-bold transition-all">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-8">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                  <span className="text-xl mr-3">💡</span>
                  Live Updates
                </h3>
                <p className="text-blue-800">All changes will instantly appear across your entire website - homepage, contact page, footer, and more!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {currentPage !== 'barber-login' && currentPage !== 'barber-dashboard' && currentPage !== 'admin-settings' && (
        <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Scissors className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 tracking-tight italic" style={{fontFamily: 'Georgia, serif', letterSpacing: '-1px'}}>Blessed Fades</span>
                </div>
                <p className="text-gray-300 font-light">Premium grooming for the discerning gentleman</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-6">Navigation</h3>
                <div className="space-y-3">
                  <button onClick={() => setCurrentPage('services')} className="block text-gray-300 hover:text-white transition font-light">Services</button>
                  <button onClick={() => setCurrentPage('barbers')} className="block text-gray-300 hover:text-white transition font-light">Our Barbers</button>
                  <button onClick={() => setCurrentPage('gallery')} className="block text-gray-300 hover:text-white transition font-light">Gallery</button>
                  <button onClick={() => setCurrentPage('contact')} className="block text-gray-300 hover:text-white transition font-light">Contact</button>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-6">Hours</h3>
                <p className="text-gray-300 font-light text-sm leading-relaxed">{shopSettings.hours.weekday}</p>
                <p className="text-gray-300 font-light text-sm mt-4">{shopSettings.hours.weekend}</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-6">Connect</h3>
                <div className="flex space-x-4 mb-6">
                  <button className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-lg transition">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-lg transition">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center space-x-2 text-gray-300 font-light">
                    <Phone className="w-4 h-4" />
                    <span>{shopSettings.phone}</span>
                  </p>
                  <p className="flex items-center space-x-2 text-gray-300 font-light">
                    <Mail className="w-4 h-4" />
                    <span>{shopSettings.email}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 font-light">
              <p>&copy; 2024 Blessed Fades. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
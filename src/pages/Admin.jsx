import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import TextReveal from '../components/UI/TextReveal';

export default function Admin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal state
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = async () => {
    try {
      const res = await fetch('https://loopsolutions.free.nf/server/api/contacts.php');
      const data = await res.json();
      if (data.status === 'success') {
        setContacts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchContacts();

    // Setup SSE for real-time notifications
    const sse = new EventSource('https://loopsolutions.free.nf/server/api/contacts.php');

    sse.onmessage = (event) => {
      try {
        const newContact = JSON.parse(event.data);
        setContacts(prev => [newContact, ...prev]);
        setNotification(`New submission received from ${newContact.name}`);

        // Clear notification after 4 seconds
        setTimeout(() => setNotification(null), 4000);
      } catch (err) {
        console.error('Failed to parse SSE data', err);
      }
    };

    return () => {
      sse.close();
    };
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <PageTransition>
      <section className="section-sm" style={{ minHeight: '100vh', paddingTop: '150px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: '1rem' }}>
            <TextReveal as="h1" className="heading-2" style={{ margin: 0 }}>
              Admin Dashboard
            </TextReveal>
            {!loading && contacts.length > 0 && (
              <div style={{ background: 'var(--color-bg-card)', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span className="text-secondary" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Submissions</span>
                <span style={{ marginLeft: '1rem', fontWeight: 'bold', color: 'var(--color-accent)', fontSize: '1.25rem' }}>{contacts.length}</span>
              </div>
            )}
          </div>

          {/* Notification Banner */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  padding: '1rem',
                  background: 'var(--color-accent)',
                  color: 'black',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: 'var(--space-md)',
                  fontWeight: 500
                }}
              >
                🔔 {notification}
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <p className="text-secondary">Loading contacts...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-secondary">No contacts yet.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '1.5rem 1rem', color: 'var(--color-accent)', fontWeight: 600 }}>Name</th>
                    <th style={{ padding: '1.5rem 1rem', color: 'var(--color-accent)', fontWeight: 600 }}>Email</th>
                    <th style={{ padding: '1.5rem 1rem', color: 'var(--color-accent)', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: '1.5rem 1rem', color: 'var(--color-accent)', fontWeight: 600 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((contact) => (
                    <tr key={contact.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '1rem', fontWeight: 500 }}>{contact.name}</td>
                      <td style={{ padding: '1rem', color: 'var(--color-text)' }}>{contact.email}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }} className="text-secondary">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => setSelectedContact(contact)}
                          style={{
                            background: 'transparent',
                            color: 'var(--color-text)',
                            border: '1px solid var(--color-accent)',
                            padding: '0.4rem 0.8rem',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--color-accent)';
                            e.currentTarget.style.color = '#000';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--color-text)';
                          }}
                        >
                          Read More
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    style={{ background: 'var(--color-bg-alt)', border: 'none', color: currentPage === 1 ? 'gray' : 'var(--color-text)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', transition: 'background 0.3s' }}
                    onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--color-bg-alt)')}
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      style={{
                        background: currentPage === i + 1 ? 'var(--color-accent)' : 'var(--color-bg-alt)',
                        color: currentPage === i + 1 ? '#000' : 'var(--color-text)',
                        border: 'none',
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => currentPage !== i + 1 && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                      onMouseLeave={(e) => currentPage !== i + 1 && (e.currentTarget.style.background = 'var(--color-bg-alt)')}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    style={{ background: 'var(--color-bg-alt)', border: 'none', color: currentPage === totalPages ? 'gray' : 'var(--color-text)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', transition: 'background 0.3s' }}
                    onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--color-bg-alt)')}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Details Modal */}
        <AnimatePresence>
          {selectedContact && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem'
              }}
              onClick={() => setSelectedContact(null)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                  background: 'var(--color-bg-card)',
                  padding: '2.5rem',
                  borderRadius: 'var(--radius-md)',
                  width: '100%',
                  maxWidth: '650px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedContact(null)}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'var(--color-bg-alt)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--color-text)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-alt)'}
                >
                  &times;
                </button>

                <h3 className="heading-3" style={{ margin: '0 0 1.5rem 0', color: 'var(--color-accent)' }}>
                  Submission Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <div>
                    <span className="text-secondary" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Name</span>
                    <strong style={{ fontSize: '1.125rem' }}>{selectedContact.name}</strong>
                  </div>
                  <div>
                    <span className="text-secondary" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</span>
                    <a href={`mailto:${selectedContact.email}`} style={{ color: 'var(--color-text)', textDecoration: 'none', borderBottom: '1px solid var(--color-accent)', paddingBottom: '2px' }}>{selectedContact.email}</a>
                  </div>
                  {selectedContact.company && (
                    <div>
                      <span className="text-secondary" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Company</span>
                      <span style={{ fontSize: '1.125rem' }}>{selectedContact.company}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-secondary" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</span>
                    <span>{new Date(selectedContact.created_at).toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <span className="text-secondary" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Message</span>
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    lineHeight: 1.8,
                    whiteSpace: 'pre-wrap',
                    fontSize: '1rem',
                    color: 'var(--color-text)'
                  }}>
                    {selectedContact.message}
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>
    </PageTransition>
  );
}

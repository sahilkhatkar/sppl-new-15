'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './page.module.css';
import { useData } from '../DataProvider';
import { IoMdSearch } from 'react-icons/io';
import { downloadPDF } from '../../components/Download';

const containerVariants = {
  hidden: { height: 0 },
  visible: {
    // height: 'auto',
    height: '65vh',
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  exit: {
    opacity: 0,
    x: 80,
    scale: 0.9,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

export default function Page() {
  const { data } = useData();

  const clients = [...new Set(data.map(obj => obj.client))].sort((a, b) => a.localeCompare(b));
  const [search, setSearch] = useState('');
  const [selectedClients, setSelectedClients] = useState(new Set());

  const filteredClients = clients.filter(client =>
    client?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (client) => {
    setSelectedClients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(client)) {
        newSet.delete(client);
      } else {
        newSet.add(client);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedClients.size === filteredClients.length) {
      setSelectedClients(new Set());
    } else {
      setSelectedClients(new Set(filteredClients));
    }
  };

  // const selectedClientsPreview = clients.filter(client =>
  //   selectedClients.has(client)
  // );

  const selectedClientsPreview = data?.reduce((accumulator, job) => {
    if (
      // job.client == "Nitin Lifescience Unit III" ||
      Array.from(selectedClients).includes(job.client) &&
      job.po_number != "Advance" &&
      job.dispatch_quantity === ""
    )
      accumulator.push(job);
    return accumulator;
  }, []);

  const keys = Object.keys(data[0] || {});
  const defaultColumns = ['client']; // default visible keys

  const [visibleColumns, setVisibleColumns] = useState(new Set(defaultColumns));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  return (
    <div className="mainContainer">
      {/* <h1 className={styles.heading}></h1> */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.heading}
      >
        Client List
      </motion.h1>

      {/* Search and Select Controls */}
      <div className={styles.searchWrapper}>
        <IoMdSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchBar}
          aria-label="Search clients"
        />
      </div>
      <div className={styles.topControls}>

        <button className={styles.selectButton} onClick={handleSelectAll}>
          {selectedClients.size === filteredClients.length ? 'Clear Selection' : 'Select All'}
        </button>

        {
          <button
            className={styles.downloadButton}
            onClick={() => {
              const customQueryList = data?.reduce((accumulator, job) => {
                if (
                  // job.client == "Nitin Lifescience Unit III" ||
                  Array.from(selectedClients).includes(job.client) &&
                  job.po_number != "Advance" &&
                  job.dispatch_quantity === ""
                )
                  accumulator.push(job);
                return accumulator;
              }, []);

              downloadPDF(customQueryList, search, Array.from(selectedClients).join('_-_').concat("-List"));
            }}
          >
            Download List
          </button>
          //)
        }

        {/* Dropdown */}
        <div className={styles.dropdownWrapper}>
          <button
            className={styles.dropdownButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Columns ▾
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {keys.map((key) => (
                <label key={key} className={styles.dropdownItem}>
                  <input
                    type="checkbox"
                    checked={visibleColumns.has(key)}
                    onChange={() =>
                      setVisibleColumns((prev) => {
                        const updated = new Set(prev);
                        updated.has(key) ? updated.delete(key) : updated.add(key);
                        return updated;
                      })
                    }
                  />
                  {key}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Client List */}
        <motion.div
          className={styles.clientListContainer}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className={styles.clientList}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <AnimatePresence>

              {filteredClients.map((client, index) => {
                const isSelected = selectedClients.has(client);

                const clientJobs = data?.reduce((accumulator, job) => {
                  if (
                    // job.client == "Nitin Lifescience Unit III" ||
                    job.client === client &&
                    job.po_number != "Advance" &&
                    job.dispatch_quantity === ""
                  ) {
                    accumulator.push(job);
                  }
                  return accumulator;
                }, []);

                return (
                  <motion.div
                    key={client}
                    className={`${styles.clientItem} ${isSelected ? styles.selected : ''}`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    onClick={() => handleSelect(client)}
                  >
                    <label className={styles.checkboxWrapper}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className={styles.checkbox}
                      />
                    </label>
                    <div className={styles.clientInfo}>
                      {/* <strong>{client}</strong> */}
                      <p>{client}</p>
                      {
                        clientJobs.length && clientJobs.length > 0 ? (
                          <span>{clientJobs.length} jobs</span>
                        ) : <span>-</span>
                      }
                    </div>
                  </motion.div>
                );
              })}


              {filteredClients.length === 0 && (
                <motion.p
                  className={styles.noResults}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  No clients found.
                </motion.p>
              )}

            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          className={styles.previewContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedClientsPreview.length > 0 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Jobs
          </motion.h2>

          <motion.div
            className={styles.previewTableWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <table className={styles.previewTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>PO</th>
                  <th>Client</th>
                  <th>Job Name</th>
                  <th>Quantity</th>
                  {/* <th>Order Status</th> */}
                  {/* Add more <th> if needed */}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {selectedClientsPreview.map((job, index) => (
                    <motion.tr
                      key={job.job_order}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <td>{index + 1}</td>
                      <td>{job.po_number}</td>
                      <td>{job.client}</td>
                      <td>{job.job_name}</td>
                      <td>{job.quantity}</td>
                      {/* <td>{job.order_status}</td> */}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        </motion.div>


      </div>
    </div>
  );
}

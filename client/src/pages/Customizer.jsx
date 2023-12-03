import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';

import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';


const Customizer = () => {
  const snap = useSnapshot(state);

  const [first, setfirst] = useState('');

  const [pro, setpro] = useState('');
  const [generatingImg, setgeneratingImg] = useState(false);
  
  const [activeEditorTab, setactiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depdenting on the activeTab

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker />
      case "aipicker":
        return <AIPicker />
      default:
        return null;
    }
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
        <motion.div
        key="custom"
        className="absolute top-0 left-0 z-10"
        {...slideAnimation('left')}
        >
        <div className="flex items-center min-h-screen">
            <div className="editortabs-container tabs">
              {EditorTabs.map((tab) => (
                <Tab 
                key={tab.name}
                tab={tab}
                handleclick={() => setactiveEditorTab(tab.name)}
                />
              ))}

              {generateTabContent()}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute z-10 top-5 right-5"
          {...fadeAnimation}
        >
          <CustomButton
            type="filled"
            title="Go Back"
            handleclick={() => state.intro = true}
            customstyles="w-fit px-4 py-2.5 font-bold text-sm"
          />
        </motion.div>

        <motion.div
        className="filtertabs-container"
          {...slideAnimation('up')}
        >
            {FilterTabs.map((tab) => (
              <Tab 
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab=""
                handleclick={() => {}}
                />
              ))}
        </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
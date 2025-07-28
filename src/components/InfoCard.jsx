import React from 'react';
import { motion } from 'framer-motion';

const InfoCard = () => {
  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      id="info-card"
      className="bg-white rounded-[20px] md:rounded-[28px] p-4 md:p-8 w-[95vw] md:w-[75vw] lg:w-[65vw] mx-auto relative"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 8px 16px -8px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Heading */}
      <h3 className="font-serif text-2xl md:text-3xl mb-4 text-center text-gray-900">
        Why You'll Love It
      </h3>
      <hr className="border-gray-300 mb-6" />

      {/* Two-column grid (stacks on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Ingredients */}
          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">🌿</span>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Ingredients (only three, always)</h4>
              <ul className="text-sm text-gray-700 space-y-1 leading-relaxed">
                <li>• Grass-fed, grass-finished beef tallow</li>
                <li>• Cold-pressed organic olive oil</li>
                <li>• Organic essential oils* for a light, scent-specific finish</li>
              </ul>
              <p className="text-xs italic text-gray-500 mt-2">
                *Unscented jars skip the essential oils—nothing but buttery goodness.
              </p>
            </div>
          </div>

          {/* Sourced for Superior Skin */}
          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">🐄</span>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Sourced for Superior Skin</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Our tallow comes from small U.S. farms that practice regenerative, year-round rotational grazing. Happy cows → nutrient-rich, golden fat packed with bio-available vitamins A, D, E & K, plus conjugated linoleic acid (CLA) and skin-loving amino acids.
              </p>
            </div>
          </div>

          {/* How to Use */}
          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">✨</span>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">How to Use</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Face, hands, elbows, baby bumps, tattoos—anywhere that needs deep, lasting hydration. A pea-sized dab is usually plenty.
              </p>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Why Tallow Beats Plant-Only Butters */}
          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">💪</span>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Why Tallow Beats Plant-Only Butters</h4>
              <ul className="text-sm text-gray-700 space-y-1 leading-relaxed">
                <li>• <strong>Fast-absorbing:</strong> melts at body temperature and soaks in quickly</li>
                <li>• <strong>Feather-light feel:</strong> no heavy oil slick, no clogged pores</li>
                <li>• <strong>Breathable barrier:</strong> locks in moisture while letting skin do its thing</li>
                <li>• <strong>Time-tested:</strong> used for centuries to keep skin smooth, resilient and radiant</li>
              </ul>
            </div>
          </div>

          {/* Olive Oil, Elevated */}
          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">🫒</span>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Olive Oil, Elevated</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                We gently blend in cold-pressed organic olive oil for a spreadable, whipped texture that glides on silk-smooth and boosts antioxidant power.
              </p>
            </div>
          </div>

          {/* Keep It Fluffy */}
          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">❄️</span>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Keep It Fluffy</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Whipped tallow can soften if it gets too warm (think summer mailboxes or hot cars). If it flattens, pop the jar in the fridge for a few minutes and stir—it's good as new. Potency never changes; only the fluff factor does.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed text-center">
          <strong>Net Wt. 8 oz glass jar.</strong><br />
          Made in small batches, always free of fillers, preservatives and synthetic fragrances.
        </p>
      </div>
    </motion.section>
  );
};

export default InfoCard; 
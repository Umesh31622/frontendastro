import React from 'react';
import KundliCalculator from '../components/calculators/KundliCalculator';
import NumerologyCalculator from '../components/calculators/NumerologyCalculator';
import CompatibilityCalculator from '../components/calculators/CompatibilityCalculator';

export default function Calculators() {
    return (
        <div>
            <h1>Astrology Calculators</h1>
            <KundliCalculator />
            <NumerologyCalculator />
            <CompatibilityCalculator />
        </div>
    );
}

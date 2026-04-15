import { useState } from 'react';
import { Card } from '../../components/shared/Card';
import { ImprovementItem } from '../../components/shared/ImprovementItem';
import { meta, improvements } from './data';

export const PuppyNote = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Card meta={meta}>
      {improvements.map((imp, i) => (
        <ImprovementItem
          key={i}
          improvement={imp}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(prev => prev === i ? null : i)}
        />
      ))}
    </Card>
  );
};

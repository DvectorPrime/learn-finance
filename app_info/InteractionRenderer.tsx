import React from 'react';
import { interactionRegistry, InteractionProps } from './InteractionKit';

export default function InteractionRenderer({ widgetType, config, onComplete }: InteractionProps & { widgetType: string }) {
  const Component = interactionRegistry[widgetType];
  if (!Component) return <section role="alert"><h2>Unsupported interaction</h2><p>No component is registered for “{widgetType}”.</p></section>;
  return <Component config={config} onComplete={onComplete} />;
}

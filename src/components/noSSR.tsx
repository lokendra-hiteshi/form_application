// ExampleComponent.js (the component you want to disable SSR for)
const ExampleComponent = () => {
  return (
    <div>
      <h1>This component is rendered only on the client-side</h1>
    </div>
  );
};

export default ExampleComponent;

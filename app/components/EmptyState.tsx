const EmptyState = () => {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 h-full  bg-gray-100 flex justify-center items-center">
      <div className="text-center flex flex-col items-center">
        <h2 className="lg:text-3xl font-semibold text-gray-900 text-2xl">
          Select a chat or start a new conversation
        </h2>
      </div>
    </div>
  );
};

export default EmptyState;

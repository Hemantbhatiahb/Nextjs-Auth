function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center py-4 min-h-screen gap-3">
      <h1 className="">UserProfile</h1>
      <p className="text-3xl">
        UserProfile id :{" "}
        <span className="bg-orange-600 rounded px-3 py-2">{params.id}</span>{" "}
      </p>
    </div>
  );
}

export default UserProfile;

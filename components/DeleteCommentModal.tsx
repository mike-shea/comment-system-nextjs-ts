export default function DeleteCommentModal(props: {
  setDeleteState: React.Dispatch<React.SetStateAction<boolean>>;
  deleteComment: () => void;
}) {
  return (
    <div className="fixed z-50 flex h-screen w-full items-center justify-center bg-black/40">
      <div className="flex max-w-sm flex-col rounded-lg bg-white p-8">
        <h1 className="pb-3 text-xl font-semibold text-slate-700">Delete Comment</h1>
        <p className="pb-4 text-base text-slate-500">
          Are you sure you want to delete this comment? This will remove the comment and can't be
          undone.
        </p>
        <div className="flex w-full gap-3">
          <button
            onClick={() => props.setDeleteState(false)}
            className="w-full rounded-lg bg-slate-500 py-2 px-6 font-semibold uppercase text-white">
            No, Cancel.
          </button>
          <button
            onClick={props.deleteComment}
            className="w-full rounded-lg bg-red-400 py-2 px-6 font-semibold uppercase text-white">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

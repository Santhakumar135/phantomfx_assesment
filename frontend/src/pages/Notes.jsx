import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import { Trash2, Plus, StickyNote, AlertCircle, Loader2 } from "lucide-react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchNotes = useCallback(async () => {
    try {
      setError(null);
      const response = await API.get("/notes/");
      setNotes(response.data);
    } catch (err) {
      setError("Could not load your notes. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createNote = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    setIsSubmitting(true);
    try {
      await API.post("/notes/", formData);
      setFormData({ title: "", content: "" });
      await fetchNotes(); 
    } catch (err) {
      setError("Failed to save note. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteNote = async (id) => {
    const previousNotes = [...notes];
    setNotes(notes.filter((n) => n.id !== id));

    try {
      await API.delete(`/notes/${id}`);
    } catch (err) {
      setNotes(previousNotes);
      setError("Could not delete the note.");
    }
  };

  const isValid = formData.title.trim().length > 0 && formData.content.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <AlertCircle size={18} />
            <p className="text-sm font-bold">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-xs font-black uppercase tracking-widest">Dismiss</button>
          </div>
        )}

        <section className="bg-white rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-8">New Entry</h2>
          <form onSubmit={createNote} className="space-y-6">
            <input
              autoComplete="off"
              name="title"
              placeholder="Give it a title..."
              value={formData.title}
              onChange={handleChange}
              className="w-full text-3xl font-bold placeholder:text-slate-200 border-none outline-none focus:ring-0 p-0"
            />
            <textarea
              name="content"
              placeholder="What's on your mind?"
              value={formData.content}
              onChange={handleChange}
              className="w-full min-h-[120px] text-lg text-slate-500 border-none outline-none focus:ring-0 p-0 resize-none leading-relaxed"
            />
            <div className="flex justify-end pt-4 border-t border-slate-50">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all duration-300 ${
                  isValid && !isSubmitting
                    ? "bg-slate-900 text-white shadow-xl hover:bg-blue-600 hover:-translate-y-1 active:scale-95"
                    : "bg-slate-100 text-slate-300 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <><Loader2 size={20} className="animate-spin" /> Syncing...</>
                ) : (
                  <><Plus size={20} /> Save Note</>
                )}
              </button>
            </div>
          </form>
        </section>

        <section>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Notes</h3>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {isLoading ? "..." : `${notes.length} saved`}
            </span>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="text-slate-300 animate-spin" size={40} />
            </div>
          ) : notes.length === 0 ? (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] py-20 text-center">
              <StickyNote className="mx-auto text-slate-200 mb-4" size={40} />
              <p className="text-slate-400 font-bold">Your collection is currently empty.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notes.map((note) => (
                <div key={note.id} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 relative flex flex-col animate-in zoom-in-95 duration-300">
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="absolute top-6 right-6 p-2 bg-red-50 text-red-500 rounded-xl lg:opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  <h4 className="text-xl font-bold text-slate-800 mb-3 pr-8 leading-tight">
                    {note.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                    {note.content}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Saved Local</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Notes;
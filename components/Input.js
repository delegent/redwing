import { useState, useRef } from 'react'
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css';
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { useSession } from 'next-auth/react'
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
// import { signOut, useSession } from "next-auth/react";
export default function Input() {
  const { data:session} = useSession();
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const filePickerRef = useRef(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const [loading,setLoading] = useState(false);
  // function to add emoji
  const addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach((el) => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }

  function addImageToPost(e) {

    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent)=>{
      setSelectedFile(readerEvent.target.result);
    };
  }
  async function sendPost() {
    if(loading) return; // if its false then set to true
    setLoading(true);
    // refercence to document
    try{
    
    const docRef = await addDoc(collection(db,'posts'),{
        id:session.user.uid,
        username:session.user.name,
        userImg:session.user.image,
        tag:session.user.tag,
        text:input,
        timestamp:serverTimestamp(),
    }); // addDoc()

    const imageRef = ref(storage,`posts/${docRef.id}/image`);

    if(selectedFile){
      await uploadString(imageRef,selectedFile,"data_url").then(async function(){
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db,"posts",docRef.id),{
          image:downloadURL,
        });
      })
    }
    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  }catch(err){
      alert(err);
    }
  }
  return (
    <div
      className={`scrollbar-hide no-scrollbar flex space-x-3 overflow-y-scroll   border-b  border-gray-700 p-3  ${
        loading && 'opacity-60'
      }`}
    >
      <img
        src={session.user.image}
        alt=""
        className="h-11 w-11 cursor-pointer rounded-full "
      />

      <div className="w-full divide-y divide-gray-700 ">
        <div className={`${selectedFile && 'pb-7'} &{input && "space-y-2.5"}`}>
          <textarea
            value={input}
            rows="2"
            className="min-h-[50px] w-full bg-transparent text-lg tracking-wide text-[#d9d9d9] placeholder-gray-500 outline-none"
            placeholder="Whats happening?"
            onChange={(e) => setInput(e.target.value)}
          />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute top-1 left-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="h-5 text-white " />
              </div>
              <img
                src={selectedFile}
                className="max-h-80 rounded-2xl object-contain "
              />
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className="h-[22px] text-[#E40223]" />
                <input
                  type="file"
                  hidden
                  onChange={addImageToPost}
                  ref={filePickerRef}
                />
              </div>
              <div className="icon rotate-90">
                <ChartBarIcon className="h-[22px] text-[#E40223]" />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="h-[22px] text-[#E40223]" />
              </div>

              <div className="icon">
                <CalendarIcon className="h-[22px] text-[#E40223]" />
              </div>

              {showEmojis && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: 'absolute',
                    marginTop: '465px',
                    marginLeft: -40,
                    maxWidth: '320px',
                    borderRadius: '20px',
                  }}
                  theme="dark"
                />
              )}
            </div>
            <button
              className="rounded-full bg-[#E40223] px-4 py-1.5 font-bold text-white shadow-md hover:bg-[#E40223] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#E40223]"
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost}
            >
              Wing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

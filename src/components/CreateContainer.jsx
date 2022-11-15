import React, { useState } from 'react'
import { motion } from 'framer-motion';

import {MdFastfood, MdCloudUpload, MdDelete, MdFoodBank} from 'react-icons/md';
import { FaWonSign } from 'react-icons/fa'
import { categories } from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config"
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const uploadProgress = (
        snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      console.log(error);
      setFields(true);
      setMsg('업로드 중 오류 발생 : 다시 시도하세요! 🙇');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false)
      }, 4000);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg("이미지가 성공적으로 업로드되었습니다. 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      })
    })
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true);
        setMsg("이미지가 성공적으로 삭제되었습니다. 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
    })
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if((!title || !calories || !imageAsset || !price || !category)) {

        setFields(true);
        setMsg('필수 입력란은 비워둘 수 없습니다.');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false)
        }, 4000);
      } else {
        const data = {
          id : `${Date.now()}`,
          title: title,
          imageUrl : imageAsset,
          category : category,
          calories: calories,
          qty : 1,
          price : price
        }
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("데이터가 성공적으로 업로드되었습니다. 😊");
        clearData();
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('업로드 중 오류 발생 : 다시 시도하세요! 🙇');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false)
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setCategory("카테고리 선택");
    setImageAsset(null);
    setCalories("");
    setPrice("");
  }

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {
          fields && (
            <motion.p 
              initial={{ opacity : 0 }}
              animate={{ opacity : 1 }}
              exit={{ opacity : 0}}
              className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
                alertStatus === "danger" 
                  ? "bg-red-400 text-red-800" 
                  : "bg-emerald-400 text-emerald-800"
                  }`}
            >
              {msg}
            </motion.p>
          )
        }

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700"/>
          <input
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력하세요...'
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select 
            onClick={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-grat-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">카테고리 선택</option>
            {categories && categories.map(item => (
              <option 
                key={item.id} 
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                value={item.urlParamName}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="group flex justify-center items-center felx-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? ( 
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3x1 hover:text-gray-700"/>
                      <p className="text-gray-500 text-3x1 hover:text-gray-700">여기에 사진을 업로드하세요</p>
                    </div>
                    <input 
                      type="file" 
                      name="uploading" 
                      accept="image/*" 
                      onChange={uploadImage} 
                      className="w-0 h-0"
                    />
                  </label>
                </> 
              ) : (
                <>
                  <div className="relative h-full">
                    <img 
                      src={imageAsset}  alt="uploaded_image" 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white"/>
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input 
              type="text" 
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="칼로리" 
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" 
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <FaWonSign className="text-gray-700 text-2xl" />
            <input 
              type="text" 
              required 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="가격" 
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" 
            />
          </div>
        </div>
        
        <div className="flex items-center w-full">
          <button
            type="button" 
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}>
              저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateContainer

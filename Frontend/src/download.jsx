import React, { useState } from 'react'
import BounceLoader from 'react-spinners/BounceLoader'
import axios from 'axios'
const Download = () => {
    const [link, setLink] = useState('')
    const [videoInfo, setVideoInfo] = useState('')
    const [resu, setResu] = useState('')
    const [loader, setLoader] = useState(false)


    const get_video_details = async (e) => {
        e.preventDefault()

        const videoId = link.split('https://youtu.be/')[1]
        try {
            setLoader(true)
            const { data } = await axios.get(`http://localhost:5000/api/get-video-info/${videoId}`)
            setLoader(false)
            setVideoInfo(data.videoInfo)
            setResu(data.videoInfo.lastResu)
        } catch (error) {
            console.log(error.response)
        }
    }
    const video_download = () => {
        const videoId = link.split('https://youtu.be/')[1]
        // console.log(resu)
        // console.log(videoId)
        const url = `http://localhost:5000/video-download?id=${videoId}&resu=${resu}`
        window.location.href = url
    }


    return (
        <div className='w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-400 via-rose-600 to-rose-700 drop-shadow-2xl flex justify-start items-center flex-col p-4 border-slate-600 border-[8px] relative font-bold'>
            <h2 className='text-white text-4xl pb-6 pt-4'>MyTubeDownloader</h2>
            <div className='mb-8'>
                <form onSubmit={get_video_details}>
                    <div className='w-[380px] flex h-[40px] relative px-3 rounded-md border-slate-500 border overflow-hidden bg-gradient-to-r from-rose-300 via-rose-400 to-rose-200'>
                        <input onChange={(e) => setLink(e.target.value)} className='text-white outline-none w-full bg-transparent' type="text" placeholder='Input youtube video link here' required />
                        <button className='full from-slate-400 via-rose-500 to-rose-400 bg-gradient-to-b hover:from-rose-600 hover:to-slate-600 ... absolute right-0 h-full px-5 text-slate-800'>Click</button>
                    </div>
                </form>
            </div>
            <div>
                {
                    loader ? <div className='w-full py-5 text-center'>
                        <BounceLoader color='#fff' />
                    </div> : videoInfo && <div className='flex gap-3 px-4'>
                        <img className='max-w-[200px] rounded-md h-[150px]' src={videoInfo.thumbnailUrl} alt="" />
                        <div className='text-white flex gap-2 flex-col '>
                            <h3>{videoInfo.title.slice(0, 70)}</h3>
                            <span>Time : 33.43</span>
                            <div className='flex gap-3 mt-4'>
                                <select onChange={(e) => setResu(e.target.value)} className='px-3 py-2 text-slate-900 outline-none full from-slate-400 via-rose-500 to-rose-400 bg-gradient-to-b border-slate-800 border rounded-md' name="" id="">
                                    {
                                        videoInfo.videoResu.length > 0 && videoInfo.videoResu.map((v, i) => <option key={i} value={v}>{v}p</option>)
                                    }
                                </select>
                                <button onClick={video_download} className='px-3 py-2 full from-slate-400 via-rose-500 to-rose-400 bg-gradient-to-b hover:from-rose-600 hover:to-slate-600 ... text-slate-900 border-slate-800 border rounded-md'>Download</button>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default Download
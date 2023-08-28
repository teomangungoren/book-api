import {useState,useEffect} from "react";
import axios from "axios";
import BookCreate from "./Components/BookCreate";
import BookList from "./Components/BookList";
function App(){
    const [books,setBooks]=useState([]);

    const fetchBook=async ()=>{
        const responseBooks=await axios.get("http://localhost:3001/books");
        setBooks(responseBooks.data);
    }

    useEffect(()=>{
        fetchBook();
    },[]);

    const createBook=async (title)=>{
        const responseBook=await axios.post("http://localhost:3001/books",{
            title
        });

        const updatedBooks=[
            ...books,
            responseBook.data
        ];
        setBooks(updatedBooks);
    }
    const deleteBookById=async (id)=>{
        const responseBook=await axios.delete(`http://localhost:3001/books/${id}`)
        const updateBooks=books.filter((book)=>{
            return book.id!==id;
        })
        setBooks(updateBooks);
    }

    const editBookById=async (id,newTitle)=>{
        const responseBook=await axios.put(`http://localhost:3001/books/${id}`,
            {title:newTitle});

        const updateBooks=books.map((book)=>{
            if(book.id===id){
                return {...book,...responseBook.data};
            }
            return book;
        })
        setBooks(updateBooks);
    }


    return <div className="app">
        <BookList books={books} onEdit={editBookById} onDelete={deleteBookById}/>
        <BookCreate onCreate={createBook}/>
    </div>
}

export default App;
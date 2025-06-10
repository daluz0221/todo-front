




export const metadata = {
 title: 'Home',
 description: 'Home Page',
};

const categories = [
    {
        "id": "1"
    }
]

export default function Home() {



    if (categories.length === 1){


        return (

            <div className="flex flex-col items-center justify-center h-[calc(100vh-170px)]">
                <h3 className="text-6xl mb-16">Bienvenido</h3>
                <h2 className="text-2xl">Parece que todavía no has creado ninguna tarea!</h2>
                <p>Entra <a href="https://www.google.com">aquí</a>  para crear primeramente una categoria</p>
            </div>
        )
    } else {
        return (
        <div className="w-full">
        
            con tareas creadas
        


        
        </div>
    );
    }

  
}

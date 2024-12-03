<div class="lider">
    <img src="https://i.pinimg.com/736x/5a/25/76/5a257680a9a4ec3413350ab09ed900fc.jpg" alt="Img del lider" />
    <h2>TODOS ALABEN A NUESTRO LIDER</h2>
</div>

<h3>DISFRUTEN DE NUESTROS CONOCIMIENTOS</h3>

<style>
    .lider {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 40px 0;
        padding: 20px 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .lider img {
        width: 25%;
        height: 25%;
        border: 10px solid black;
        box-shadow: 0 0 10px black;
        margin: 10px;
        transition: transform 0.5s;
    }
    
    .lider img:hover {
        transform: scale(1.05);
        cursor: grab;
    }

    .lider h2 {
        font-size: 2em;
        color: red;
        text-shadow: 2px 2px 2px black;
    }

    h3 {
        font-size: 1.5em;
        text-align: center;
    }
</style>
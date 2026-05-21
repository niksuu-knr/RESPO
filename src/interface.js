<!DOCTYPE html>
<html lang="fi">
<head>
    <meta charset="UTF-8">
    <title>SAM4s SPS-2000 - Täysi Firmware Integraatio</title>
    <style>
        body { background: #222; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; }
        .grid { display: grid; grid-template-columns: repeat(8, 80px); gap: 5px; margin-top: 20px; }
        .key { width: 80px; height: 60px; background: #444; border: 1px solid #000; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px; text-align: center; }
        .key:active { background: #666; }
        #display { width: 640px; height: 100px; background: #000; color: #0f0; margin-top: 20px; padding: 10px; font-family: monospace; overflow: hidden; }
    </style>
</head>
<body>

    <div id="display">KASSA VALMIS. TILA: REG</div>
    <div class="grid" id="keyboard"></div>

    <script>
        // Kytketään aiemmin luodut moottorit käyttöliittymään
        const Keyboard = document.getElementById('keyboard');
        const Display = document.getElementById('display');

        // Luodaan 40 painiketta
        for(let i = 1; i <= 40; i++) {
            let btn = document.createElement('div');
            btn.className = 'key';
            
            // Määritellään painikkeiden toiminnallisuus (Sivut 18-24 logiikka)
            if(i === 1) { btn.innerText = "KAHVI\n(PLU 101)"; btn.onclick = () => { InputController.handleKeyPress('PLU', 101); updateDisp(); }; }
            else if(i === 32) { btn.innerText = "CASH"; btn.onclick = () => { InputController.handleKeyPress('CASH'); updateDisp(); }; }
            else if(i === 40) { btn.innerText = "MODE"; btn.onclick = () => { InputController.handleKeyPress('MODE_SWITCH'); updateDisp(); }; }
            else { btn.innerText = "P" + i; }
            
            Keyboard.appendChild(btn);
        }

        function updateDisp() {
            Display.innerText = `MODE: ${SPS2000_Kernel.RAM.Mode} | SUBTOTAL: ${SPS2000_Kernel.RAM.ActiveReceipt.Subtotal.toFixed(2)} €`;
        }
    </script>
</body>
</html>

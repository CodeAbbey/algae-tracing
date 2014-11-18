function Algae(canvasId, inputId, buttonId) {
    this.canvasId = canvasId;
    this.inputId = inputId;
    this.buttonId = buttonId;
    
    this.step = 40;
    
    this.init();
}

Algae.prototype.init = function() {
    var canvas = document.getElementById(this.canvasId);
    this.ctx = canvas.getContext('2d');
    this.w = canvas.width;
    this.h = canvas.height;
    
    this.input = document.getElementById(this.inputId);
    
    var self = this;
    document.getElementById(this.buttonId).onclick = function() {
        self.redraw();
    };
}

Algae.prototype.redraw = function() {
    var s = this.input.value;
    if (!/^[AB]+$/.test(s)) {
        alert("Input should consist of several 'A' or 'B' characters!");
        return;
    }
    var ctx = this.ctx;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, this.w, this.h);
    
    this.drawPath(s, Math.floor(this.w / 2), Math.floor(this.h / 2), this.step);
}

Algae.prototype.drawPath = function(path, cx, cy, step) {
    var ctx = this.ctx;
    var x = 0;
    var y = 0;
    var d = 0;
    ctx.strokeStyle = '#0000aa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    for (var i = 0; i < path.length; i++) {
        if (path.charAt(i) == 'A') {
            var offs = this.rotate(0, step, d);
            ctx.lineTo(cx + x + offs[0], cy - y - offs[1]);
            x += offs[0];
            y += offs[1];
            continue;
        }
        var refPt = this.rotate(0, -step, d);
        var endPt = this.rotate(step, -step, d);
        ctx.arcTo(cx + x + refPt[0], cy - y - refPt[1], cx + x + endPt[0], cy - y - endPt[1], step);
        x += endPt[0];
        y += endPt[1]
        d = (d + 1) % 4;
    }
    ctx.stroke();
}

Algae.prototype.rotate = function(x, y, d) {
    switch (d) {
        case 0: return [x, y];
        case 1: return [-y, x];
        case 2: return [-x, -y];
        case 3: return [y, -x];
    }
}

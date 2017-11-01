var FAR_PLANE = 100;
var WALL_SIZE_W = 8;
var WALL_SIZE_H = 5;
var WALL_SPEED = 20;

var cubeAlphaPrefab : GameObject;
var cubeOpaquePrefab : GameObject;
var cube;
var wall = new Array(4);

var cubeW : float = 1;
var cubeH : float = 1;

var wallZ : float = -1;

function Start() {
	cube = Instantiate(cubeAlphaPrefab, cubeAlphaPrefab.transform.position, cubeAlphaPrefab.transform.rotation);
	
	wall[0] = Instantiate(cubeOpaquePrefab, new Vector3(0, 0, 0), cubeOpaquePrefab.transform.rotation);
	wall[1] = Instantiate(cubeOpaquePrefab, new Vector3(0, 0, 0), cubeOpaquePrefab.transform.rotation);
	wall[2] = Instantiate(cubeOpaquePrefab, new Vector3(0, 0, 0), cubeOpaquePrefab.transform.rotation);
	wall[3] = Instantiate(cubeOpaquePrefab, new Vector3(0, 0, 0), cubeOpaquePrefab.transform.rotation);
	
	cubeW = 3;
	cubeH = 3;
	cube.transform.localScale = new Vector3(cubeW, cubeH, 1);
	
	SpawnWall();
}

function Update() {
	wallZ -= WALL_SPEED * Time.deltaTime;
	for (var i=0; i<4; i++) {
		wall[i].transform.position.z = wallZ;
	}
	if (wallZ < -15) {
		SpawnWall();
	}
	
}
function SpawnWall () {
	var x = Mathf.Round(Random.Range(-WALL_SIZE_W + cubeW * 0.5, WALL_SIZE_W - cubeW * 0.5));
	var y = Mathf.Round(Random.Range(-WALL_SIZE_H + cubeH * 0.5, WALL_SIZE_H - cubeH * 0.5));
	
	UpdateWall (x, y, cubeW, cubeH);
	
	wallZ = FAR_PLANE;
}

function UpdateWall (x, y, w, h) {
	var leftEdge = x - w * 0.5;
	var rightEdge = x + w * 0.5;
	var topEdge = y + h * 0.5;
	var bottomEdge = y - h * 0.5;
	
	
	wall[0].transform.localScale = new Vector3(leftEdge + WALL_SIZE_W, WALL_SIZE_H * 2, 1);
	wall[0].transform.position   = new Vector3(leftEdge - (leftEdge + WALL_SIZE_W) * 0.5, 0, FAR_PLANE);
	
	wall[1].transform.localScale = new Vector3(w, WALL_SIZE_H - topEdge, 1);
	wall[1].transform.position   = new Vector3(x, topEdge + (WALL_SIZE_H - topEdge) * 0.5, FAR_PLANE);
	
	wall[2].transform.localScale = new Vector3(WALL_SIZE_W - rightEdge, WALL_SIZE_H * 2, 1);
	wall[2].transform.position   = new Vector3(rightEdge + (WALL_SIZE_W - rightEdge) * 0.5, 0, FAR_PLANE);
	
	wall[3].transform.localScale = new Vector3(w, bottomEdge + WALL_SIZE_H, 1);
	wall[3].transform.position   = new Vector3(x, bottomEdge - (bottomEdge + WALL_SIZE_H) * 0.5, FAR_PLANE);
}




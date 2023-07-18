import { DomPortal } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import {
  EngineConfig,
  EngineModule,
  LevelEditorComponent,
  ILevelEditorReady,
  DefaultPawn,
  GameMesh,
  SkyDome,
  CloudDome,
  LevelEditorService,
} from '@daxur-studios/engine';
import { CoreService } from '@services';
import { takeUntil } from 'rxjs';
import {
  PerspectiveCamera,
  Mesh,
  MeshNormalMaterial,
  BoxGeometry,
} from 'three';

@Component({
  selector: 'app-level-editor-page',
  templateUrl: './level-editor-page.component.html',
  styleUrls: ['./level-editor-page.component.scss'],
  standalone: true,
  imports: [LevelEditorComponent],
  host: {
    class: 'flex-page',
  },
  providers: [LevelEditorService],
})
export class LevelEditorPageComponent implements OnInit {
  @ViewChild(LevelEditorComponent, { static: true })
  levelEditor?: LevelEditorComponent;

  @ViewChild('domPortalContent', { static: true })
  domPortalContent?: ElementRef<HTMLDivElement>;

  config: EngineConfig = new EngineConfig({
    webGLRendererParameters: {
      antialias: true,
    },
  });

  constructor(
    private coreService: CoreService,
    private levelEditorService: LevelEditorService
  ) {
    this.levelEditorService;
  }

  ngOnInit(): void {
    this.levelEditor?.toolbar?.addToolbarPortal(
      new DomPortal(this.domPortalContent),
      'right'
    );
  }

  onEditorReady({ engine, editor }: ILevelEditorReady) {
    setTimeout(() => {
      this.coreService.initPasses(engine);
    }, 900);

    engine.camera.position.set(0, 0, 10);
    engine.camera.lookAt(0, 0, 0);

    const mesh = new GameMesh(
      new BoxGeometry(1, 1, 1),
      new MeshNormalMaterial()
    );
    engine.scene.add(mesh);

    engine.tick$.pipe(takeUntil(engine!.onDestroy$)).subscribe((delta) => {
      mesh.rotation.x += 1.01 * delta;
      mesh.rotation.y += 1.01 * delta;
      mesh.rotation.z += 1.01 * delta;
    });

    const cloudDome = new CloudDome();
    cloudDome.load({});
    cloudDome.spawn(engine);

    const sky = new SkyDome();
    sky.load({});
    sky.spawn(engine);

    const defaultPawn = new DefaultPawn();
    defaultPawn.load({});
    defaultPawn.spawn(engine);

    console.debug('!cloudDome', cloudDome, engine.scene);
  }

  togglePixelShader() {
    if (this.coreService.pixelatePass) {
      this.coreService.pixelatePass.enabled =
        !this.coreService.pixelatePass.enabled;
    }

    if (this.coreService.renderPixelatedPass) {
      this.coreService.renderPixelatedPass.enabled =
        !this.coreService.renderPixelatedPass.enabled;
    }

    if (this.coreService.unrealBloomPass) {
      this.coreService.unrealBloomPass.enabled =
        !this.coreService.unrealBloomPass.enabled;
    }
  }
}

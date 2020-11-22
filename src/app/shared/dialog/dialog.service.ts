import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  ComponentType,
  PortalInjector,
} from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';
import { BaseDialogComponent } from './base-dialog.component';
import { DialogOverlayRef } from './dialog-overlay-ref';
import { DIALOG_DATA } from './dialog.tokens';
import { DEFAULT_CONFIG, DialogConfig } from './dialog.model';

// Based on https://blog.thoughtram.io/angular/2017/11/20/custom-overlays-with-angulars-cdk.html

@Injectable()
export class DialogService {
  constructor(private injector: Injector, private overlay: Overlay) {}

  open<TComponent extends BaseDialogComponent = BaseDialogComponent>(
    component: ComponentType<TComponent>
  );
  open<
    TComponent extends BaseDialogComponent = BaseDialogComponent,
    TConfig extends DialogConfig = DialogConfig
  >(
    component: ComponentType<TComponent>,
    data: null,
    config?: TConfig
  ): DialogOverlayRef;
  open<
    TComponent extends BaseDialogComponent = BaseDialogComponent,
    TData extends {} = any
  >(component: ComponentType<TComponent>, data?: TData): DialogOverlayRef;
  open<
    TComponent extends BaseDialogComponent = BaseDialogComponent,
    TConfig extends DialogConfig = DialogConfig,
    TData extends {} = any
  >(
    component: ComponentType<TComponent>,
    data?: TData,
    config?: TConfig
  ): DialogOverlayRef {
    // Override default configuration
    const dialogConfig: TConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new DialogOverlayRef(overlayRef);

    const portalInjector = this.createInjector(dialogRef, data);

    const overlayComponent = this.attachDialogContainer(
      component,
      overlayRef,
      portalInjector
    );

    // overlayRef.backdropClick().subscribe(() => dialogRef.close());

    return dialogRef;
  }

  private createOverlay<TConfig extends DialogConfig = DialogConfig>(
    config: TConfig
  ) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer<
    TComponent extends BaseDialogComponent = BaseDialogComponent
  >(
    component: ComponentType<TComponent>,
    overlayRef: OverlayRef,
    injector: PortalInjector
  ) {
    const containerPortal = new ComponentPortal(component, null, injector);

    const containerRef: ComponentRef<TComponent> = overlayRef.attach(
      containerPortal
    );

    return containerRef.instance;
  }

  private createInjector<TData extends {} = any>(
    dialogRef: DialogOverlayRef,
    data?: TData
  ): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(DialogOverlayRef, dialogRef);

    if (data) {
      // Using an injection token I can pass data to my components, similar to what angular/components do.
      injectionTokens.set(DIALOG_DATA, data);
    }

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig<TConfig extends DialogConfig = DialogConfig>(
    config: TConfig
  ): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
      ...config,
    });

    return overlayConfig;
  }
}

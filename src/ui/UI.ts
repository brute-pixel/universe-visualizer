import type { CelestialCategory, CelestialObject } from "../types";

const CATEGORY_LABEL: Record<CelestialCategory, string> = {
  star: "Star",
  planet: "Planet",
  moon: "Moon",
  dwarf: "Dwarf Planet",
  galaxy: "Galaxy",
  nebula: "Nebula",
  cluster: "Star Cluster",
};

const CATEGORY_PLURAL: Record<CelestialCategory, string> = {
  star: "Stars",
  planet: "Planets",
  moon: "Moons",
  dwarf: "Dwarf Planets",
  galaxy: "Galaxies",
  nebula: "Nebulae",
  cluster: "Star Clusters",
};

const CATEGORY_ORDER: CelestialCategory[] = [
  "star",
  "planet",
  "galaxy",
  "nebula",
  "cluster",
  "dwarf",
  "moon",
];

function el<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing element #${id}`);
  return node as T;
}

export interface UICallbacks {
  onSelect(obj: CelestialObject): void;
  onFocus(obj: CelestialObject): void;
  onReset(): void;
  onTour(): void;
  onToggleMotion(on: boolean): void;
}

export class UI {
  private objects: CelestialObject[] = [];
  private current: CelestialObject | null = null;

  private panel = el<HTMLElement>("info-panel");
  private badge = el<HTMLElement>("info-badge");
  private name = el<HTMLElement>("info-name");
  private subtitle = el<HTMLElement>("info-subtitle");
  private desc = el<HTMLElement>("info-desc");
  private facts = el<HTMLElement>("info-facts");
  private searchInput = el<HTMLInputElement>("search");
  private searchResults = el<HTMLElement>("search-results");
  private navList = el<HTMLElement>("nav-list");
  private tooltip = el<HTMLElement>("tooltip");

  private cb: UICallbacks;

  constructor(cb: UICallbacks) {
    this.cb = cb;
  }

  init(objects: CelestialObject[]): void {
    this.objects = objects;
    this.buildNav();
    this.wireEvents();
  }

  private wireEvents(): void {
    el<HTMLButtonElement>("info-close").addEventListener("click", () => this.hidePanel());
    el<HTMLButtonElement>("info-focus").addEventListener("click", () => {
      if (this.current) this.cb.onFocus(this.current);
    });
    el<HTMLButtonElement>("btn-reset").addEventListener("click", () => {
      this.cb.onReset();
      this.hidePanel();
    });
    el<HTMLButtonElement>("btn-tour").addEventListener("click", () => this.cb.onTour());
    el<HTMLInputElement>("toggle-motion").addEventListener("change", (e) => {
      this.cb.onToggleMotion((e.target as HTMLInputElement).checked);
    });
    el<HTMLButtonElement>("nav-toggle").addEventListener("click", () => {
      el<HTMLElement>("navigator").classList.toggle("collapsed");
    });

    this.searchInput.addEventListener("input", () => this.renderSearch());
    this.searchInput.addEventListener("focus", () => this.renderSearch());
    document.addEventListener("click", (e) => {
      if (!(e.target as HTMLElement).closest(".search-wrap")) {
        this.searchResults.innerHTML = "";
      }
    });
  }

  private buildNav(): void {
    this.navList.innerHTML = "";
    const grouped = new Map<CelestialCategory, CelestialObject[]>();
    for (const o of this.objects) {
      const arr = grouped.get(o.category) ?? [];
      arr.push(o);
      grouped.set(o.category, arr);
    }
    for (const cat of CATEGORY_ORDER) {
      const items = grouped.get(cat);
      if (!items || items.length === 0) continue;
      const title = document.createElement("div");
      title.className = "nav-group-title";
      title.textContent = CATEGORY_PLURAL[cat];
      this.navList.appendChild(title);
      for (const o of items) {
        const item = document.createElement("div");
        item.className = "nav-item";
        item.dataset.id = o.id;
        item.innerHTML = `<span class="dot" style="background:${o.color};color:${o.color}"></span><span>${o.name}</span>`;
        item.addEventListener("click", () => this.cb.onSelect(o));
        this.navList.appendChild(item);
      }
    }
  }

  private renderSearch(): void {
    const q = this.searchInput.value.trim().toLowerCase();
    const matches = (q
      ? this.objects.filter(
          (o) =>
            o.name.toLowerCase().includes(q) ||
            o.category.toLowerCase().includes(q) ||
            o.subtitle.toLowerCase().includes(q),
        )
      : this.objects
    ).slice(0, 8);

    this.searchResults.innerHTML = "";
    for (const o of matches) {
      const row = document.createElement("div");
      row.className = "result-item";
      row.innerHTML = `<span class="dot" style="background:${o.color};color:${o.color}"></span><span>${o.name}</span><span class="result-cat">${CATEGORY_LABEL[o.category]}</span>`;
      row.addEventListener("click", () => {
        this.cb.onSelect(o);
        this.searchInput.value = "";
        this.searchResults.innerHTML = "";
      });
      this.searchResults.appendChild(row);
    }
  }

  showPanel(obj: CelestialObject): void {
    this.current = obj;
    this.badge.textContent = CATEGORY_LABEL[obj.category];
    this.badge.style.background = obj.color;
    this.name.textContent = obj.name;
    this.subtitle.textContent = obj.subtitle;
    this.subtitle.style.color = obj.color;
    this.desc.textContent = obj.description;
    this.facts.innerHTML = "";
    for (const f of obj.facts) {
      const row = document.createElement("div");
      row.className = "fact";
      row.innerHTML = `<dt>${f.label}</dt><dd>${f.value}</dd>`;
      this.facts.appendChild(row);
    }
    this.panel.classList.remove("hidden");
    this.setActiveNav(obj.id);
  }

  hidePanel(): void {
    this.panel.classList.add("hidden");
    this.current = null;
    this.setActiveNav(null);
  }

  private setActiveNav(id: string | null): void {
    for (const item of Array.from(this.navList.children)) {
      if (!(item instanceof HTMLElement) || !item.dataset.id) continue;
      item.classList.toggle("active", item.dataset.id === id);
    }
  }

  showTooltip(name: string, x: number, y: number): void {
    this.tooltip.textContent = name;
    this.tooltip.style.left = `${x}px`;
    this.tooltip.style.top = `${y}px`;
    this.tooltip.classList.remove("hidden");
  }

  hideTooltip(): void {
    this.tooltip.classList.add("hidden");
  }
}

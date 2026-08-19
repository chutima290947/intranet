import { useEffect, useState } from 'react'
import { useContent } from '../../../context/ContentContext'
import { useAuth } from '../../../context/AuthContext'
import {
  emptyFromFields,
  stampAutoDatetime,
  FieldInput,
  FileFieldInput,
  RowActions,
} from './FieldInputs'

// ============================================================
// Sub List Editor
// ============================================================

function SubListEditor({ field, items, onChange }) {
  const list = Array.isArray(items) ? items : []
  const [primaryField, ...restFields] = field.fields
  const [openIdx, setOpenIdx] = useState(null)

  const updateItem = (idx, key, value) => {
    onChange(list.map((it, i) => (i === idx ? { ...it, [key]: value } : it)))
  }

  const addItem = () => {
    onChange([...list, emptyFromFields(field.fields)])
    setOpenIdx(list.length)
  }

  const removeItem = (idx) => {
    onChange(list.filter((_, i) => i !== idx))
    setOpenIdx(null)
  }

  const moveItem = (idx, dir) => {
    const target = idx + dir
    if (target < 0 || target >= list.length) return

    const next = [...list]
    ;[next[idx], next[target]] = [next[target], next[idx]]
    onChange(next)
  }

  return (
    <div className="rounded-xl border border-line bg-white p-3">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[12px] font-bold text-navy-900">{field.label}</p>
          <p className="text-[10px] text-ink-soft">{list.length} รายการ</p>
        </div>

        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1 rounded-md border-none bg-navy-900 px-2.5 py-1.5 text-[10.5px] font-bold text-white"
        >
          <i className="ti ti-plus" />
          เพิ่มรายการ
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {list.map((item, idx) => {
          const isOpen = openIdx === idx

          return (
            <div
              key={idx}
              className={`overflow-hidden rounded-lg border bg-white transition-shadow ${
                isOpen
                  ? 'border-blue-300 shadow-[0_2px_8px_rgba(37,99,235,.08)]'
                  : 'border-line'
              }`}
            >
              <div className="flex items-center gap-2 px-2.5 py-2">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-navy-900/[.06] text-[10px] font-bold text-navy-900">
                  {idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex flex-1 items-center gap-1.5 overflow-hidden border-none bg-transparent text-left"
                >
                  <span className="truncate text-[12px] font-semibold text-navy-900">
                    {primaryField
                      ? item[primaryField.key] || '(ยังไม่ตั้งชื่อ)'
                      : `รายการที่ ${idx + 1}`}
                  </span>

                  {restFields.length > 0 && (
                    <i
                      className={`ti ti-chevron-down flex-shrink-0 text-[12px] text-ink-soft transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                <RowActions
                  size="xs"
                  onUp={() => moveItem(idx, -1)}
                  onDown={() => moveItem(idx, 1)}
                  onDelete={() => removeItem(idx)}
                />
              </div>

              {isOpen && (
                <div className="border-t border-line bg-paper/30 px-2.5 py-2.5">
                  {primaryField && (
                    <div className="mb-2">
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-ink-soft/70">
                        {primaryField.label}
                      </label>

                      <FieldInput
                        field={primaryField}
                        value={item[primaryField.key]}
                        onChange={(v) => updateItem(idx, primaryField.key, v)}
                      />
                    </div>
                  )}

                  {restFields.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {restFields.map((f) => (
                        <div
                          key={f.key}
                          className={
                            f.type === 'textarea' ||
                            f.type === 'image' ||
                            f.type === 'file' ||
                            f.type === 'sublist' ||
                            f.type === 'tree'
                              ? 'col-span-2'
                              : ''
                          }
                        >
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-ink-soft/70">
                            {f.label}
                          </label>

                          {f.type === 'sublist' ? (
                            <SubListEditor
                              field={f}
                              items={item[f.key]}
                              onChange={(v) => updateItem(idx, f.key, v)}
                            />
                          ) : (
                            <FieldInput
                              field={f}
                              value={item[f.key]}
                              onChange={(v) => updateItem(idx, f.key, v)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {list.length === 0 && (
          <p className="rounded-lg border border-dashed border-line py-4 text-center text-[11px] text-ink-soft">
            ยังไม่มีรายการย่อย — กด "เพิ่มรายการ" เพื่อเริ่มต้น
          </p>
        )}
      </div>
    </div>
  )
}

// ============================================================
// Tree Editor
// ============================================================

function emptyTreeNode() {
  return { label: '' }
}

function countDescendants(children) {
  if (!Array.isArray(children)) return 0

  return children.reduce(
    (sum, c) => sum + 1 + countDescendants(c.children),
    0
  )
}

// เก็บ path ของทุก node ที่ "มีลูก" ในทั้งต้นไม้ (ใช้ตอนกด "ขยายทั้งหมด")
// path เป็น string เช่น "0", "0-1", "0-1-2" อ้างอิงตามตำแหน่ง idx ของแต่ละชั้น
function collectExpandablePaths(nodes, prefix = '') {
  const list = Array.isArray(nodes) ? nodes : []
  let paths = []

  list.forEach((node, idx) => {
    const path = prefix ? `${prefix}-${idx}` : `${idx}`

    if (Array.isArray(node.children) && node.children.length > 0) {
      paths.push(path)
      paths = paths.concat(collectExpandablePaths(node.children, path))
    }
  })

  return paths
}

function TreeNodeRow({
  node,
  idx,
  path,
  updateNode,
  removeNode,
  addChild,
  moveNode,
  depth,
  expandedPaths,
  togglePath,
  expandPath,
  openLinkPath,
  toggleLinkPath,
}) {
  const showLink = openLinkPath === path

  const expanded = expandedPaths.has(path)
  const hasLink = Boolean(node.href || node.file)
  const hasChildren = Array.isArray(node.children) && node.children.length > 0
  const descendantCount = hasChildren ? countDescendants(node.children) : 0

  const handleAddChild = () => {
    addChild(idx)
    expandPath(path)
  }

  // สีพื้นหลังไล่ตามความลึกของ node — อ่อนลงเรื่อยๆ ทีละชั้น ช่วยให้ตาแยกระดับได้ง่ายโดยไม่ต้องนับ indent
  const depthBg =
    depth === 0
      ? 'bg-white'
      : depth === 1
        ? 'bg-slate-50/70'
        : 'bg-slate-50/40'

  return (
    <div
      className={
        depth === 0
          ? `rounded-lg border border-line ${depthBg} shadow-[0_1px_2px_rgba(11,40,80,.04)]`
          : `rounded-lg border border-line/60 ${depthBg}`
      }
    >
      <div className="flex items-center gap-2 px-2.5 py-2">
        {/* พื้นที่ตัวเลข + ปุ่มขยาย — เลขลำดับโชว์เฉพาะหัวข้อหลัก (depth 0) เท่านั้น หัวข้อย่อยเอาออกเพื่อลดความรก */}
        <div className="flex flex-shrink-0 items-center gap-1">
          {depth === 0 && (
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-navy-900/[.07] text-[10.5px] font-bold text-navy-900">
              {idx + 1}
            </span>
          )}

          {hasChildren ? (
            <button
              type="button"
              onClick={() => togglePath(path)}
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-navy-900/[.08] hover:text-navy-900"
              aria-label={expanded ? 'พับหัวข้อย่อย' : 'ขยายหัวข้อย่อย'}
              title={expanded ? 'พับหัวข้อย่อย' : 'ขยายหัวข้อย่อย'}
            >
              <i
                className={`ti ti-chevron-right text-[14px] transition-transform ${
                  expanded ? 'rotate-90' : ''
                }`}
              />
            </button>
          ) : (
            <span className="h-7 w-7 flex-shrink-0" aria-hidden="true" />
          )}
        </div>

        <input
          value={node.label || ''}
          onChange={(e) => updateNode(idx, { label: e.target.value })}
          placeholder="ข้อความหัวข้อ"
          className={`flex-1 rounded-lg border border-line bg-white px-2.5 py-2 text-[12.5px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
            depth === 0 ? 'font-semibold text-navy-900' : 'text-ink'
          }`}
        />

        {hasChildren && !expanded && (
          <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
            {descendantCount} รายการย่อย
          </span>
        )}

        {depth === 0 && (
          <input
            value={node.icon || ''}
            onChange={(e) => updateNode(idx, { icon: e.target.value })}
            placeholder="ti-icon"
            className="w-24 flex-shrink-0 rounded-lg border border-line px-2 py-2 text-[11.5px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        )}

        <button
          type="button"
          onClick={() => toggleLinkPath(path)}
          className={`relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border-none ${
            showLink
              ? 'bg-blue-600 text-white'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
          aria-label="แนบลิงก์หรือไฟล์"
          title="แนบลิงก์หรือไฟล์ให้หัวข้อนี้"
        >
          <i className="ti ti-paperclip text-[14px]" />
          {hasLink && !showLink && (
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-500" />
          )}
        </button>

        <button
          type="button"
          onClick={handleAddChild}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border-none bg-blue-50 text-blue-600 hover:bg-blue-100"
          aria-label="เพิ่มหัวข้อย่อย"
          title="เพิ่มหัวข้อย่อย"
        >
          <i className="ti ti-plus" />
        </button>

        <RowActions
          onUp={() => moveNode(idx, -1)}
          onDown={() => moveNode(idx, 1)}
          onDelete={() => removeNode(idx)}
        />
      </div>

      {showLink && (
        <div className="mx-2 mb-2 grid grid-cols-2 gap-2 rounded-lg border border-line bg-paper/40 p-2.5">
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-ink-soft/70">
              ลิงก์ "{node.label || 'หัวข้อนี้'}" (URL)
            </label>
            <FieldInput
              field={{ type: 'url' }}
              value={node.href}
              onChange={(v) => updateNode(idx, { href: v })}
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-ink-soft/70">
              หรือแนบไฟล์ PDF
            </label>
            <FileFieldInput
              value={node.file}
              onChange={(v) => updateNode(idx, { file: v })}
            />
          </div>
        </div>
      )}

      {hasChildren && expanded && (
        <div className="px-2 pb-2">
          <TreeNodeEditor
            nodes={node.children}
            onChange={(next) => updateNode(idx, { children: next })}
            depth={depth + 1}
            path={path}
            expandedPaths={expandedPaths}
            togglePath={togglePath}
            expandPath={expandPath}
            openLinkPath={openLinkPath}
            toggleLinkPath={toggleLinkPath}
          />
        </div>
      )}
    </div>
  )
}

// depth 0 ใช้ gap กว้างกว่าเล็กน้อย ให้แต่ละหัวข้อหลักแยกจากกันชัดเจน ส่วน depth ลึกกว่าใช้ gap แคบลงเพราะอยู่ในกรอบเดียวกันแล้ว
function TreeNodeEditor({ nodes, onChange, depth = 0, path = '', expandedPaths, togglePath, expandPath, openLinkPath, toggleLinkPath }) {
  const list = Array.isArray(nodes) ? nodes : []

  const updateNode = (idx, patch) => {
    onChange(list.map((n, i) => (i === idx ? { ...n, ...patch } : n)))
  }

  const removeNode = (idx) => {
    onChange(list.filter((_, i) => i !== idx))
  }

  const addNode = () => {
    onChange([...list, emptyTreeNode()])
  }

  const addChild = (idx) => {
    const node = list[idx]
    const children = Array.isArray(node.children) ? node.children : []

    updateNode(idx, { children: [...children, emptyTreeNode()] })
  }

  const moveNode = (idx, dir) => {
    const target = idx + dir
    if (target < 0 || target >= list.length) return

    const next = [...list]
    ;[next[idx], next[target]] = [next[target], next[idx]]
    onChange(next)
  }

  return (
    <div className={depth > 0 ? 'mt-2 border-l-2 border-blue-100 pl-3' : ''}>
      <div className={`flex flex-col ${depth === 0 ? 'gap-2.5' : 'gap-2'}`}>
        {list.map((node, idx) => {
          const childPath = path ? `${path}-${idx}` : `${idx}`

          return (
            <TreeNodeRow
              key={idx}
              node={node}
              idx={idx}
              path={childPath}
              total={list.length}
              depth={depth}
              updateNode={updateNode}
              removeNode={removeNode}
              addChild={addChild}
              moveNode={moveNode}
              expandedPaths={expandedPaths}
              togglePath={togglePath}
              expandPath={expandPath}
              openLinkPath={openLinkPath}
              toggleLinkPath={toggleLinkPath}
            />
          )
        })}
      </div>

      <button
        type="button"
        onClick={addNode}
        className="mt-2 flex items-center gap-1 rounded-md border border-line bg-white px-2.5 py-1.5 text-[10.5px] font-semibold text-navy-900 hover:bg-paper"
      >
        <i className="ti ti-plus" />
        เพิ่มหัวข้อ{depth > 0 ? 'ย่อย' : ''}
      </button>
    </div>
  )
}

// ครอบ TreeNodeEditor ระดับบนสุด — คุมสถานะขยาย/ยุบของทั้งต้นไม้ไว้ที่จุดเดียว
// เพื่อให้ปุ่ม "ขยายทั้งหมด / ยุบทั้งหมด" สั่งได้ทีเดียวทั้งก้อน แทนที่จะเป็น local state แยกทุกแถว
// path ของ node หนึ่งๆ อ้างอิงเป็น "0-1-2" (idx แต่ละชั้นคั่นด้วย -)
// สองฟังก์ชันนี้ใช้หา parent prefix และจำนวนชั้น เพื่อเช็คว่า node สอง path เป็น "พี่น้องกัน" (sibling) ไหม
function getParentPrefix(path) {
  return path.includes('-') ? path.slice(0, path.lastIndexOf('-')) : ''
}

function getDepthOf(path) {
  return path.split('-').length
}

// ลบ path นี้ทิ้ง พร้อมลบ path ของลูกหลานทั้งหมด (path ที่ขึ้นต้นด้วย prefix + '-')
function collapseSubtree(set, path) {
  set.delete(path)
  Array.from(set).forEach((p) => {
    if (p.startsWith(`${path}-`)) set.delete(p)
  })
}

function TreeEditor({ nodes, onChange }) {
  const [expandedPaths, setExpandedPaths] = useState(() => new Set())
  // เก็บ path ของแถวเดียวที่เปิดแผงลิงก์/ไฟล์อยู่ (accordion: เปิดได้ทีละแถวทั้งต้นไม้)
  const [openLinkPath, setOpenLinkPath] = useState(null)

  const toggleLinkPath = (path) => {
    setOpenLinkPath((prev) => (prev === path ? null : path))
  }

  // เปิด path นี้ — และยุบ sibling อื่นๆ ที่อยู่ระดับเดียวกัน (accordion: เปิดได้ทีละอันต่อระดับ)
  const openPath = (path) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev)
      const parentPrefix = getParentPrefix(path)
      const depth = getDepthOf(path)

      Array.from(next).forEach((p) => {
        if (p === path) return
        if (getDepthOf(p) === depth && getParentPrefix(p) === parentPrefix) {
          collapseSubtree(next, p)
        }
      })

      next.add(path)
      return next
    })
  }

  const togglePath = (path) => {
    setExpandedPaths((prev) => {
      if (prev.has(path)) {
        const next = new Set(prev)
        collapseSubtree(next, path)
        return next
      }

      // เปิด path นี้ + ยุบ sibling ระดับเดียวกัน
      const next = new Set(prev)
      const parentPrefix = getParentPrefix(path)
      const depth = getDepthOf(path)

      Array.from(next).forEach((p) => {
        if (getDepthOf(p) === depth && getParentPrefix(p) === parentPrefix) {
          collapseSubtree(next, p)
        }
      })

      next.add(path)
      return next
    })
  }

  const expandPath = (path) => {
    openPath(path)
  }

  const expandablePaths = collectExpandablePaths(nodes)
  const hasNested = expandablePaths.length > 0
  const allExpanded =
    hasNested && expandablePaths.every((p) => expandedPaths.has(p))

  const handleExpandAll = () => {
    setExpandedPaths(new Set(collectExpandablePaths(nodes)))
  }

  const handleCollapseAll = () => {
    setExpandedPaths(new Set())
  }

  return (
    <div>
      {hasNested && (
        <div className="mb-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleExpandAll}
            disabled={allExpanded}
            className="flex items-center gap-1 rounded-md border border-line bg-white px-2.5 py-1.5 text-[10.5px] font-semibold text-navy-900 hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
          >
            <i className="ti ti-arrows-maximize text-[11px]" />
            ขยายทั้งหมด
          </button>

          <button
            type="button"
            onClick={handleCollapseAll}
            disabled={expandedPaths.size === 0}
            className="flex items-center gap-1 rounded-md border border-line bg-white px-2.5 py-1.5 text-[10.5px] font-semibold text-navy-900 hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
          >
            <i className="ti ti-arrows-minimize text-[11px]" />
            ยุบทั้งหมด
          </button>
        </div>
      )}

      <TreeNodeEditor
        nodes={nodes}
        onChange={onChange}
        depth={0}
        path=""
        expandedPaths={expandedPaths}
        togglePath={togglePath}
        expandPath={expandPath}
        openLinkPath={openLinkPath}
        toggleLinkPath={toggleLinkPath}
      />
    </div>
  )
}

// ============================================================
// Collection Editor
// ============================================================

export function CollectionEditor({ schema }) {
  const { content, updateCollection } = useContent()
  const { can } = useAuth()
  const canCreate = can(schema.key, 'create')
  const canUpdate = can(schema.key, 'update')
  const canDelete = can(schema.key, 'delete')
  const savedItems = content[schema.key] || []

  const [draftItems, setDraftItems] = useState(savedItems)
  const [openIdx, setOpenIdx] = useState(null)
  const [justSaved, setJustSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    setDraftItems(content[schema.key] || [])
    setOpenIdx(null)
    setJustSaved(false)
    setSaveError('')
  }, [schema.key, content])

  const isDirty = JSON.stringify(draftItems) !== JSON.stringify(savedItems)

  const updateItem = (idx, key, value) => {
    setDraftItems((items) =>
      items.map((it, i) => (i === idx ? { ...it, [key]: value } : it))
    )
  }

  const addItem = () => {
    setDraftItems((items) => [...items, emptyFromFields(schema.fields)])
    setOpenIdx(draftItems.length)
  }

  const removeItem = (idx) => {
    if (!window.confirm('ยืนยันลบรายการนี้?')) return

    setDraftItems((items) => items.filter((_, i) => i !== idx))
    setOpenIdx(null)
  }

  const moveItem = (idx, dir) => {
    const target = idx + dir
    if (target < 0 || target >= draftItems.length) return

    setDraftItems((items) => {
      const next = [...items]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next
    })
  }

  // ก่อนบันทึกจริง: stamp field ประเภท datetime-auto ("วันที่อัปเดตล่าสุด")
  // ให้เป็นเวลาปัจจุบัน เฉพาะรายการที่มีการแก้ไขจริง (เทียบกับของที่บันทึกไว้ล่าสุด)
  // รายการที่ไม่ได้แตะเลยจะไม่ถูก stamp ซ้ำ ป้องกัน "วันที่อัปเดตล่าสุด" ขยับทั้งที่ไม่ได้แก้
  const handleSave = async () => {
    try {
      setSaving(true)
      setSaveError('')

      const stamped = draftItems.map((item, idx) => {
        const original = savedItems[idx]
        const changed = JSON.stringify(item) !== JSON.stringify(original)
        return changed ? stampAutoDatetime(item, schema.fields) : item
      })

      await updateCollection(schema.key, stamped)
      setDraftItems(stamped)
      setJustSaved(true)
      setTimeout(() => setJustSaved(false), 1500)
    } catch (err) {
      setSaveError(err.message || 'บันทึกไม่สำเร็จ กรุณาลองใหม่')
    } finally {
      setSaving(false)
    }
  }

  const handleDiscard = () => {
    if (!window.confirm('ยกเลิกการแก้ไขทั้งหมดที่ยังไม่บันทึก?')) return

    setDraftItems(savedItems)
    setOpenIdx(null)
    setSaveError('')
  }

  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-bold text-navy-900">{schema.label}</h2>

          {schema.description && (
            <p className="mt-0.5 text-[12px] text-ink-soft">{schema.description}</p>
          )}
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          {isDirty && (
            <button
              type="button"
              onClick={handleDiscard}
              className="rounded-lg border border-line bg-white px-3 py-2 text-[11.5px] font-semibold text-ink-soft hover:bg-paper"
            >
              ยกเลิกการแก้ไข
            </button>
          )}
          {canCreate && (
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-[11.5px] font-semibold text-navy-900 hover:bg-paper"
            >
              <i className="ti ti-plus text-[13px]" />
              เพิ่มรายการใหม่
            </button>
          )}
          {canUpdate && (
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty}
              className={`flex items-center gap-1.5 rounded-lg border-none px-3.5 py-2 text-[11.5px] font-bold text-white ${
                isDirty ? 'bg-navy-900 hover:bg-navy-800' : 'cursor-not-allowed bg-navy-900/40'
              }`}
            >
              <i className="ti ti-device-floppy text-[13px]" />
              {justSaved ? 'บันทึกแล้ว ✓' : 'บันทึกการเปลี่ยนแปลง'}
            </button>
          )}
        </div>
      </div>

      {saveError && (
        <p className="mb-3 rounded-md bg-coral-tint px-3 py-2 text-[12px] font-semibold text-coral">
          {saveError}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {draftItems.map((item, idx) => {
          const isOpen = openIdx === idx
          const title = schema.itemLabel
            ? schema.itemLabel(item)
            : item.label || item.name || item.title || `รายการที่ ${idx + 1}`

          return (
            <div
              key={idx}
              className={`overflow-hidden rounded-xl border bg-white transition-shadow ${
                isOpen
                  ? 'border-blue-300 shadow-[0_4px_16px_rgba(37,99,235,.08)]'
                  : 'border-line shadow-[0_1px_3px_rgba(11,40,80,.04)] hover:shadow-[0_2px_8px_rgba(11,40,80,.06)]'
              }`}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-navy-900/[.06] text-[11px] font-bold text-navy-900">
                  {idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex flex-1 items-center gap-2 overflow-hidden border-none bg-transparent text-left"
                >
                  <span className="truncate text-[13.5px] font-semibold text-navy-900">
                    {title || '(ยังไม่ตั้งชื่อ)'}
                  </span>

                  <i
                    className={`ti ti-chevron-down flex-shrink-0 text-[13px] text-ink-soft transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {canUpdate && (
                  <RowActions
                    onUp={() => moveItem(idx, -1)}
                    onDown={() => moveItem(idx, 1)}
                    onDelete={canDelete ? () => removeItem(idx) : undefined}
                    hideDelete={!canDelete}
                  />
                )}
              </div>

              {isOpen && (
                <div className="border-t border-line bg-paper/30 px-4 py-4">
                  <fieldset disabled={!canUpdate} className="grid grid-cols-2 gap-3.5 disabled:opacity-60">
                    {schema.fields.map((f) => (
                      <div
                        key={f.key}
                        className={
                          f.type === 'textarea' ||
                          f.type === 'sublist' ||
                          f.type === 'image' ||
                          f.type === 'file' ||
                          f.type === 'tree'
                            ? 'col-span-2'
                            : ''
                        }
                      >
                        <label className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-wide text-ink-soft/70">
                          {f.label}
                        </label>

                        {f.type === 'sublist' ? (
                          <SubListEditor
                            field={f}
                            items={item[f.key]}
                            onChange={(v) => updateItem(idx, f.key, v)}
                          />
                        ) : f.type === 'tree' ? (
                          <div className="rounded-xl border border-line bg-paper/40 p-3">
                            <TreeEditor
                              nodes={item[f.key]}
                              onChange={(v) => updateItem(idx, f.key, v)}
                            />
                          </div>
                        ) : (
                          <FieldInput
                            field={f}
                            value={item[f.key]}
                            onChange={(v) => updateItem(idx, f.key, v)}
                          />
                        )}
                      </div>
                    ))}
                  </fieldset>
                </div>
              )}
            </div>
          )
        })}

        {draftItems.length === 0 && (
          <p className="rounded-xl border border-dashed border-line py-10 text-center text-[12px] text-ink-soft">
            ยังไม่มีรายการ กด "+ เพิ่มรายการใหม่" เพื่อเริ่มต้น
          </p>
        )}
      </div>

      {isDirty && (
        <div className="sticky bottom-4 mt-4 flex items-center justify-between rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-amber-700">
            <i className="ti ti-alert-circle text-[14px]" />
            มีการแก้ไขที่ยังไม่ได้บันทึก
          </span>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-md border-none bg-amber-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-amber-700 disabled:opacity-60"
          >
            {saving ? 'กำลังบันทึก...' : 'บันทึกตอนนี้'}
          </button>
        </div>
      )}
    </div>
  )
}